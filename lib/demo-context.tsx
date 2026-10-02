"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

type DemoCtx = { isOpen: boolean; open: () => void; close: () => void };

const Ctx = createContext<DemoCtx | null>(null);

export function DemoProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const open = useCallback(() => setOpen(true), []);
  const close = useCallback(() => setOpen(false), []);
  const value = useMemo(() => ({ isOpen, open, close }), [isOpen, open, close]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useDemo() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useDemo must be used inside <DemoProvider>");
  return ctx;
}
