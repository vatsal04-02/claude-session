# Hero background loop

`scene.html` draws the animated automation dashboard on a canvas; `window.render(t)` draws time `t` (seconds),
periodic over 12s so the video loops seamlessly.

Render: open it in headless Chromium at 1920×1080, call `render(i / 30)` for i = 0…359 and screenshot each frame,
then encode at 1600×900:

    ffmpeg -framerate 30 -i f%04d.jpg -vf scale=1600:900,format=yuv420p -c:v libx264 -crf 26 -movflags +faststart -an public/hero-bg.mp4
    ffmpeg -framerate 30 -i f%04d.jpg -vf scale=1600:900,format=yuv420p -c:v libvpx-vp9 -crf 40 -b:v 0 -an public/hero-bg.webm

Poster: frame 90 → `public/hero-bg-poster.webp`.
