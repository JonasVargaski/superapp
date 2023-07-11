"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { InputFormField } from "@/components/hook-form-fields/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "@/lib/zod";
import { toast } from "@/components/ui/use-toast";

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>;

const schema = z.object({
  email: z.string().email(),
});

type LoginFormFields = z.infer<typeof schema>;

export function ForgotPasswordForm({ className, ...props }: UserAuthFormProps) {
  const { control, handleSubmit, formState } = useForm<LoginFormFields>({
    resolver: zodResolver(schema),
    defaultValues: { email: "" },
  });

  async function onSubmit(data: LoginFormFields) {
    console.log("onSubmit forgot-password-form", data);
    toast({
      title: "Ocorreu um erro ao redefinir sua senha",
      description: (
        <blockquote className="text-red-500">Not implemented</blockquote>
      ),
    });
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-3">
          <InputFormField
            control={control}
            name="email"
            label="E-mail"
            autoComplete="email"
          />

          <Button type="submit" loading={formState.isSubmitting}>
            Redefinir senha
          </Button>
        </div>
      </form>
    </div>
  );
}
