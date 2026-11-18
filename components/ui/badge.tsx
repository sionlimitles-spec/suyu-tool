import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em]",
  {
    variants: {
      variant: {
        ready: "border-emerald-400/25 bg-emerald-400/10 text-emerald-300",
        soon: "border-white/10 bg-white/[0.06] text-ink-200/70",
        brand: "border-ink-400/30 bg-ink-500/15 text-ink-200",
        soft: "border-white/10 bg-white/[0.05] text-ink-200/80",
      },
    },
    defaultVariants: { variant: "soft" },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}
