"use client";

import * as React from "react";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const toggleVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors hoverable:hover:bg-neutral-100 hoverable:hover:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-neutral-100 data-[state=on]:text-neutral-900 dark:ring-offset-neutral-950 dark:hoverable:hover:bg-neutral-800 dark:hoverable:hover:text-neutral-400 dark:focus-visible:ring-neutral-300 dark:data-[state=on]:bg-neutral-800 dark:data-[state=on]:text-neutral-50",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline:
          "border border-neutral-200 bg-transparent hoverable:hover:bg-neutral-100 hoverable:hover:text-neutral-900 dark:border-neutral-800 dark:hoverable:hover:bg-neutral-800 dark:hoverable:hover:text-neutral-50",
      },
      size: {
        default: "h-10 px-3",
        sm: "h-9 px-2.5",
        xs: "h-8 px-2.5",
        lg: "h-11 px-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const ToggleGroupRoot = React.forwardRef<
  React.ElementRef<typeof ToggleGroup.Root>,
  React.ComponentPropsWithoutRef<typeof ToggleGroup.Root>
>(({ className, children, ...props }, ref) => (
  <ToggleGroup.Root ref={ref} className={className} {...props}>
    {children}
  </ToggleGroup.Root>
));
const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof ToggleGroup.Item>,
  React.ComponentPropsWithoutRef<typeof ToggleGroup.Item> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, children, ...props }, ref) => (
  <ToggleGroup.Item
    className={cn(toggleVariants({ variant, size, className }))}
    {...props}
  >
    {children}
  </ToggleGroup.Item>
));

ToggleGroupRoot.displayName = ToggleGroup.Root.displayName;
ToggleGroupItem.displayName = ToggleGroup.Item.displayName;

export { ToggleGroupRoot, ToggleGroupItem, toggleVariants };
