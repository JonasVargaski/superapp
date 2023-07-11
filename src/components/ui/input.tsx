import * as React from "react";

import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";

const inputVariants = cva(
  "flex h-10 w-full px-3 py-2 bg-background border border-input rounded-md text-slate-700 text-sm shadow-sm focus:outline-none disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        default: "focus:border-slate-400 focus:ring-1 focus:ring-slate-400",
        destructive:
          "border-red-500 focus:text-slate-800 focus:border-red-500 focus:ring-1 focus:ring-red-500",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

type InputProps = VariantProps<typeof inputVariants> &
  React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ className, variant }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input, type InputProps };
