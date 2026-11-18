"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

export const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn("relative flex w-full touch-none select-none items-center py-2", className)}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-white/[0.1]">
      <SliderPrimitive.Range className="absolute h-full bg-gradient-to-r from-ink-500 to-cyan-400" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-4 w-4 rounded-full border border-white/50 bg-white shadow-[0_0_0_4px_rgba(59,130,246,0.18)] transition hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-400/70 disabled:pointer-events-none disabled:opacity-50" />
  </SliderPrimitive.Root>
));
Slider.displayName = "Slider";
