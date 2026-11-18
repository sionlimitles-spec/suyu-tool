import * as React from "react";

import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type = "text", ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={cn(
        "h-11 w-full rounded-xl border border-white/10 bg-white/[0.06] px-3.5 text-sm text-ink-50 outline-none transition placeholder:text-ink-200/40",
        "focus:border-ink-400/60 focus:bg-white/[0.08] focus:ring-2 focus:ring-ink-500/25",
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = "Input";

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "w-full resize-none rounded-xl border border-white/10 bg-white/[0.06] px-3.5 py-3 text-sm leading-relaxed text-ink-50 outline-none transition placeholder:text-ink-200/40",
      "focus:border-ink-400/60 focus:bg-white/[0.08] focus:ring-2 focus:ring-ink-500/25",
      className,
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";

export const Label = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={cn("text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-200/60", className)}
    {...props}
  />
));
Label.displayName = "Label";

export const ColorField = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <div
    className={cn(
      "flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.06] p-2 focus-within:border-ink-400/60 focus-within:ring-2 focus-within:ring-ink-500/25",
      className,
    )}
  >
    <input
      ref={ref}
      type="color"
      className="h-9 w-9 shrink-0 cursor-pointer rounded-lg border-0 bg-transparent p-0 [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:rounded-lg [&::-webkit-color-swatch]:border-0"
      {...props}
    />
    <span className="font-mono text-xs uppercase text-ink-200/70">
      {String(props.value ?? "").toUpperCase()}
    </span>
  </div>
));
ColorField.displayName = "ColorField";

export const NativeSelect = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(({ className, children, ...props }, ref) => (
  <div className="relative">
    <select
      ref={ref}
      className={cn(
        "h-11 w-full appearance-none rounded-xl border border-white/10 bg-white/[0.06] px-3.5 pr-10 text-sm text-ink-50 outline-none transition",
        "focus:border-ink-400/60 focus:ring-2 focus:ring-ink-500/25 [&>option]:bg-night-800 [&>option]:text-ink-50",
        className,
      )}
      {...props}
    >
      {children}
    </select>
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-200/50"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  </div>
));
NativeSelect.displayName = "NativeSelect";
