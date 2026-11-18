"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-night-900 disabled:pointer-events-none disabled:opacity-50 active:translate-y-px [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-to-r from-ink-500 via-ink-400 to-cyan-400 text-white shadow-[0_14px_36px_-14px_rgba(59,130,246,0.95)] hover:brightness-110 hover:shadow-[0_18px_46px_-14px_rgba(34,211,238,0.85)]",
        secondary:
          "border border-white/[0.12] bg-white/[0.06] text-ink-50 hover:border-white/20 hover:bg-white/[0.1]",
        ghost: "text-ink-200 hover:bg-white/[0.07] hover:text-white",
        outline:
          "border border-white/15 bg-transparent text-ink-50 hover:border-ink-400/50 hover:bg-ink-500/10",
      },
      size: {
        sm: "h-9 px-3.5 text-[13px]",
        md: "h-11 px-5",
        lg: "h-12 px-6 text-[15px]",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
