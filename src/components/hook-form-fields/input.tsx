"use client";
import { useId } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Controller,
  FieldPath,
  FieldValues,
  UseControllerProps,
} from "react-hook-form";
import { HelperText } from "../ui/helper-text";
import { cn } from "@/lib/utils";

type TFormFieldsProps<TFieldValues extends FieldValues = FieldValues> =
  UseControllerProps<TFieldValues, FieldPath<TFieldValues>> &
    React.InputHTMLAttributes<HTMLInputElement> & {
      label?: string;
      helperText?: string;
    };

export function InputFormField<TFieldValues extends FieldValues = FieldValues>({
  name,
  id,
  label,
  control,
  defaultValue,
  helperText,
  className,
  ...props
}: TFormFieldsProps<TFieldValues>) {
  const _id = useId();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field, fieldState: { error } }) => (
        <div className={cn("grid gap-1", className)}>
          {label && <Label htmlFor={id || _id}>{label}</Label>}
          <Input
            id={id || _id}
            autoCapitalize="none"
            autoCorrect="off"
            aria-describedby={id || _id}
            variant={error?.message ? "destructive" : "default"}
            {...field}
            {...props}
          />
          {!!(error?.message || helperText) && (
            <HelperText
              id={id || _id}
              variant={error?.message ? "destructive" : "default"}
              className="pl-1"
            >
              {error?.message || helperText}
            </HelperText>
          )}
        </div>
      )}
    />
  );
}
