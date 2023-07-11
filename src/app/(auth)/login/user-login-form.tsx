"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { InputFormField } from "@/components/hook-form-fields/input";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "@/lib/zod";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>;

const schema = z.object({
  email: z
    .string()
    .email()
    .transform((email) => email.toLowerCase()),
  password: z.string().min(4),
});

type LoginFormFields = z.infer<typeof schema>;

export function UserLoginForm({ className, ...props }: UserAuthFormProps) {
  const callbackUrl = useSearchParams().get("callbackUrl") || "/";
  const router = useRouter();

  const { control, handleSubmit, formState } = useForm<LoginFormFields>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit({ email, password }: LoginFormFields) {
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl,
    });

    if (res?.error)
      return toast({
        title: "Dados de acesso inválidos",
        description: "Verifique seu e-mail e senha e tente novamente.",
      });

    await router.push(callbackUrl);
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
          <InputFormField
            control={control}
            name="password"
            label="Senha"
            autoComplete="password"
            type="password"
          />

          <p className="text-sm text-muted-foreground">
            Esqueceu sua senha?
            <Link
              href="/forgot-password"
              className="underline pl-2 underline-offset-3 hover:text-primary"
            >
              Recupere aqui.
            </Link>
          </p>
          <Button type="submit" loading={formState.isSubmitting}>
            Entrar com E-mail
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            ou continue com
          </span>
        </div>
      </div>
      <Button
        variant="outline"
        type="button"
        onClick={() => signIn("google")}
        disabled={formState.isSubmitting}
        leftIcon={<Icons.Google className="mr-2 h-4 w-4" />}
      >
        Google
      </Button>
    </div>
  );
}
