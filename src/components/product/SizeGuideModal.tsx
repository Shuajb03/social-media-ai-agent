"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

const ROWS = [
  { size: "XS", chest: "84-88", waist: "68-72", length: "66" },
  { size: "S", chest: "89-93", waist: "73-77", length: "68" },
  { size: "M", chest: "94-98", waist: "78-82", length: "70" },
  { size: "L", chest: "99-104", waist: "83-88", length: "72" },
  { size: "XL", chest: "105-110", waist: "89-94", length: "74" },
  { size: "XXL", chest: "111-116", waist: "95-100", length: "76" },
];

export function SizeGuideModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-xs uppercase tracking-widest-plus text-ink/50 underline underline-offset-4 hover:text-ink"
      >
        Size Guide
      </button>
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-ink/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              className="fixed left-1/2 top-1/2 z-50 w-[92%] max-w-lg -translate-x-1/2 -translate-y-1/2 bg-cream p-6 sm:p-8"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
            >
              <div className="mb-6 flex items-center justify-between">
                <h2 className="font-display text-2xl text-ink">Size Guide</h2>
                <button type="button" aria-label="Close" onClick={() => setOpen(false)}>
                  <X className="h-5 w-5" strokeWidth={1.5} />
                </button>
              </div>
              <p className="mb-4 text-xs text-ink/50">Measurements in centimeters</p>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-line text-[11px] uppercase tracking-widest-plus text-ink/40">
                      <th className="py-2 pr-4">Size</th>
                      <th className="py-2 pr-4">Chest</th>
                      <th className="py-2 pr-4">Waist</th>
                      <th className="py-2">Length</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ROWS.map((row) => (
                      <tr key={row.size} className="border-b border-line/60">
                        <td className="py-2.5 pr-4 font-medium text-ink">{row.size}</td>
                        <td className="py-2.5 pr-4 text-ink/70">{row.chest}</td>
                        <td className="py-2.5 pr-4 text-ink/70">{row.waist}</td>
                        <td className="py-2.5 text-ink/70">{row.length}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
