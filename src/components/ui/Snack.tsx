'use client';
import React, { createContext, useContext, useState, useCallback, useEffect } from "react";

type SnackType = "success" | "error" | "info";
type SnackItem = { id: string; message: string; type?: SnackType };

const SnackContext = createContext<{ show: (message: string, type?: SnackType) => void } | null>(null);

export function SnackProvider({ children }: { children: React.ReactNode }) {
  const [snacks, setSnacks] = useState<SnackItem[]>([]);

  const show = useCallback((message: string, type: SnackType = "info") => {
    const id = String(Date.now()) + Math.random().toString(36).slice(2, 9);
    setSnacks((s) => [...s, { id, message, type }]);
    setTimeout(() => {
      setSnacks((s) => s.filter((sn) => sn.id !== id));
    }, 3000);
  }, []);

  return (
    <SnackContext.Provider value={{ show }}>
      {children}
      <div className="pointer-events-none fixed left-1/2 top-4 z-50 w-[40%]  -translate-x-1/2 px-4">
        <div className="flex flex-col gap-2">
          {snacks.map((sn) => (
            <div
              key={sn.id}
              className={
                "pointer-events-auto rounded-md p-3 shadow-lg text-white flex items-center justify-between " +
                (sn.type === "success"
                  ? "bg-emerald-600"
                  : sn.type === "error"
                    ? "bg-rose-600"
                    : "bg-slate-700")
              }
            >
              <div className="text-sm">{sn.message}</div>
            </div>
          ))}
        </div>
      </div>
    </SnackContext.Provider>
  );
}

export function useSnack() {
  const ctx = useContext(SnackContext);
  if (!ctx) throw new Error("useSnack must be used within SnackProvider");
  return ctx;
}