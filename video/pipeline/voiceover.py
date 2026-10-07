"""
Voiceover for the pipeline video: synthesises each narration line with Kokoro (offline neural TTS,
warm female voice "af_heart"), places it at its scene's start time, and muxes the mixed track into
public/pipeline-video.{mp4,webm} without re-encoding the picture.

    pip install kokoro-onnx soundfile
    # model files: https://github.com/thewh1teagle/kokoro-onnx/releases/tag/model-files-v1.0
    #   kokoro-v1.0.onnx + voices-v1.0.bin
    python video/pipeline/voiceover.py --kokoro-dir /path/to/kokoro-files [--voice af_heart] [--speed 1.0]

    # or Piper:  python video/pipeline/voiceover.py --engine piper --voice /path/to/en-us-ryan-high.onnx

Run it after render.mjs (render.mjs writes silent video; this adds the audio track).
"""
import argparse, os, shutil, subprocess, sys, tempfile

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
PUB = os.path.join(ROOT, "public")
DURATION = 45.0

# (start s, latest end s, line) — matches the scene timings in story.html
LINES = [
    (0.4, 4.6, "You're not short on leads. You're short on follow-up."),
    (5.4, 10.7, "Eleven oh two at night. A customer messages. The system replies instantly. You're asleep."),
    (11.4, 16.7, "Next morning, follow-up's done. Everyone who didn't reply got a nudge. Automatically."),
    (17.4, 22.7, "Bookings fill themselves. The calendar confirms, reminds, and re-books no-shows."),
    (23.4, 28.7, "Old customers come back. Review requests and repeat offers go out on their own."),
    (29.4, 34.7, "And you check one screen. Every lead, chat and booking, in one place."),
    (35.6, 44.2, "We don't sell marketing. We install growth engines. Get your free two-minute visibility audit. Message us on WhatsApp."),
]


def run(*args):
    subprocess.run(args, check=True)


def duration(path):
    out = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", path],
                         check=True, capture_output=True, text=True).stdout
    return float(out.strip())


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--engine", choices=["kokoro", "piper"], default="kokoro")
    ap.add_argument("--voice", default="af_heart", help="Kokoro voice name, or Piper .onnx model path")
    ap.add_argument("--kokoro-dir", help="folder with kokoro-v1.0.onnx and voices-v1.0.bin")
    ap.add_argument("--speed", type=float, default=1.0, help="Kokoro speaking speed")
    ap.add_argument("--piper", default=shutil.which("piper") or "piper", help="piper executable")
    ap.add_argument("--length-scale", default="1.0", help="Piper speaking pace (>1 slower)")
    a = ap.parse_args()

    if a.engine == "kokoro":
        from kokoro_onnx import Kokoro
        import soundfile as sf
        kok = Kokoro(os.path.join(a.kokoro_dir, "kokoro-v1.0.onnx"), os.path.join(a.kokoro_dir, "voices-v1.0.bin"))

    tmp = tempfile.mkdtemp(prefix="flowhq-vo-")
    clips = []
    for i, (start, end, text) in enumerate(LINES):
        raw = os.path.join(tmp, f"l{i}.wav")
        if a.engine == "kokoro":
            samples, sr = kok.create(text, voice=a.voice, speed=a.speed, lang="en-us")
            sf.write(raw, samples, sr)
        else:
            subprocess.run([a.piper, "-m", a.voice, "--length_scale", a.length_scale, "-f", raw],
                           input=text, text=True, check=True, capture_output=True)
        d, slot = duration(raw), end - start
        clip = raw
        if d > slot:  # speed up just enough to fit its scene (atempo keeps the pitch)
            tempo = min(d / slot, 1.25)
            clip = os.path.join(tmp, f"l{i}f.wav")
            run("ffmpeg", "-loglevel", "error", "-y", "-i", raw, "-filter:a", f"atempo={tempo:.3f}", clip)
            print(f"line {i}: {d:.2f}s > {slot:.2f}s slot, tempo x{tempo:.2f}")
        else:
            print(f"line {i}: {d:.2f}s in {slot:.2f}s slot")
        clips.append((start, clip))

    # place every clip at its start time, mix, normalise loudness, pad to the full length
    inputs, chains = [], []
    for i, (start, clip) in enumerate(clips):
        inputs += ["-i", clip]
        ms = int(start * 1000)
        chains.append(f"[{i}:a]aresample=48000,adelay={ms}|{ms}[a{i}]")
    mix = "".join(f"[a{i}]" for i in range(len(clips)))
    graph = ";".join(chains) + f";{mix}amix=inputs={len(clips)}:normalize=0,loudnorm=I=-16:TP=-1.5:LRA=11,apad,atrim=0:{DURATION}[out]"
    track = os.path.join(tmp, "voice.wav")
    run("ffmpeg", "-loglevel", "error", "-y", *inputs, "-filter_complex", graph, "-map", "[out]", "-ac", "1", "-ar", "48000", track)

    for name, codec in (("pipeline-video.mp4", ["-c:a", "aac", "-b:a", "128k", "-movflags", "+faststart"]),
                        ("pipeline-video.webm", ["-c:a", "libopus", "-b:a", "96k"])):
        src = os.path.join(PUB, name)
        out = os.path.join(tmp, name)
        run("ffmpeg", "-loglevel", "error", "-y", "-i", src, "-i", track, "-map", "0:v:0", "-map", "1:a:0",
            "-c:v", "copy", *codec, "-t", str(DURATION), out)
        shutil.move(out, src)
        print("muxed", name)
    shutil.rmtree(tmp, ignore_errors=True)


if __name__ == "__main__":
    sys.exit(main())
