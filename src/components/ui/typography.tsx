import {
  PolymorphicComponentPropsWithRef,
  PolymorphicRef,
} from "@/types/polymorphic";
import React, { ElementType, forwardRef, ReactNode } from "react";

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const typographyVariants = cva("", {
  variants: {
    variant: {
      h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
      h2: "scroll-m-20 text-3xl font-semibold tracking-tight transition-colors first:mt-0",
      h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
      h4: "scroll-m-20 text-xl font-semibold tracking-tight",
      p: "leading-7",
      blockquote: "my-2 border-l-2 pl-6 text-sm italic",
      code: "my-2 relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
      lead: "text-xl text-muted-foreground leading-6",
      muted: "block text-sm text-muted-foreground",
      large: "block text-lg font-semibold leading-6",
      medium: "block text-md font-semibold leading-5",
      small: "block text-sm font-medium leading-5",
    },
  },
  defaultVariants: {
    variant: "p",
  },
});

type Variants = Exclude<
  VariantProps<typeof typographyVariants>["variant"],
  null | undefined
>;

const variantMap: Record<Variants, ElementType> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  p: "p",
  muted: "p",
  large: "b",
  medium: "span",
  code: "code",
  lead: "span",
  small: "span",
  blockquote: "blockquote",
};

type TypographyProps<C extends ElementType> = PolymorphicComponentPropsWithRef<
  C,
  VariantProps<typeof typographyVariants> & {
    children: ReactNode;
  }
>;

type TypographyComponent = <C extends ElementType = "span">(
  props: TypographyProps<C>
) => ReactNode | null;

const Typography: TypographyComponent = forwardRef(function Typography<
  C extends ElementType = "span"
>(
  { as, variant, className, children, ...rest }: TypographyProps<C>,
  ref?: PolymorphicRef<C>
) {
  const Component = (as || variantMap[variant as Variants]) ?? "span";

  return (
    <Component
      {...rest}
      ref={ref}
      className={cn(typographyVariants({ variant, className }))}
    >
      {children}
    </Component>
  );
});

export { Typography, type TypographyProps };
