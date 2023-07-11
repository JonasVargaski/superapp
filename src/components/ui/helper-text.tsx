"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { forwardRef, HTMLAttributes } from "react";

const helperTextVariants = cva("text-xs", {
  variants: {
    variant: {
      default: "text-muted-foreground",
      destructive: "text-destructive",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type HelperTextProps = VariantProps<typeof helperTextVariants> &
  HTMLAttributes<HTMLParagraphElement>;

const HelperText = forwardRef<HTMLParagraphElement, HelperTextProps>(
  ({ variant, className, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn(helperTextVariants({ variant, className }))}
        {...props}
      />
    );
  }
);

HelperText.displayName = "HelperText";

export { HelperText };
