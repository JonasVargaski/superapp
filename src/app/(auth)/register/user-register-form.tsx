"use client";

import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { z } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputFormField } from "@/components/hook-form-fields/input";
import { signIn } from "next-auth/react";
import { toast } from "@/components/ui/use-toast";

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>;

const schema = z
  .object({
    name: z.string().trim().min(4, "Informe seu nome completo"),
    email: z
      .string()
      .email()
      .transform((email) => email.toLowerCase()),
    password: z.string().min(4),
    password_confirm: z.string().min(4),
  })
  .refine((data) => data.password === data.password_confirm, {
    message: "As senhas precisam ser iguais",
    path: ["password_confirm"],
  });

type RegisterFormFields = z.infer<typeof schema>;

export function UserRegisterForm({ className, ...props }: UserAuthFormProps) {
  const { control, handleSubmit, formState } = useForm<RegisterFormFields>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", password: "", password_confirm: "" },
  });

  async function onSubmit(data: RegisterFormFields) {
    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    if (!res.ok)
      return toast({
        title: "Ocorreu um erro ao realizar o cadastro.",
        description: (await res.json()).message,
      });

    await signIn("credentials", {
      redirect: true,
      email: data.email,
      password: data.password,
      callbackUrl: "/",
    });

    toast({ title: "Cadastro realizado com sucesso!" });
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-3">
          <InputFormField
            control={control}
            name="name"
            label="Nome completo"
            autoComplete="name"
          />
          <InputFormField
            control={control}
            name="email"
            label="E-mail"
            autoComplete="email"
          />
          <InputFormField
            control={control}
            name="password"
            label="Senha"
            type="password"
            autoComplete="password"
          />
          <InputFormField
            control={control}
            name="password_confirm"
            label="Confirme sua senha"
            type="password"
          />

          <Button type="submit" disabled={formState.isSubmitting}>
            Cadastrar-se com E-mail
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Ou continue com
          </span>
        </div>
      </div>
      <Button
        variant="outline"
        type="button"
        disabled={formState.isSubmitting}
        leftIcon={<Icons.Google className="mr-2 h-4 w-4" />}
      >
        Google
      </Button>
    </div>
  );
}
