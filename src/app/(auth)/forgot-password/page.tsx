import Link from "next/link";
import { Metadata } from "next";

import { ForgotPasswordForm } from "./forgot-password-form";
import { AuthHeaderScaffold } from "@/app/(auth)/header-scaffold";

export const metadata: Metadata = {
  title: "SuperApp - Redefir senha",
  description: "Informe seu e-mail para recuperação de senha",
};

export default function ForgotPasswordPage() {
  return (
    <>
      <AuthHeaderScaffold.Root>
        <AuthHeaderScaffold.Title>Redefinir senha</AuthHeaderScaffold.Title>
        <AuthHeaderScaffold.Description>
          Informe o e-mail no campo abaixo para o qual deseja redefinir sua
          senha.
        </AuthHeaderScaffold.Description>
      </AuthHeaderScaffold.Root>

      <ForgotPasswordForm />

      <Link
        href="/login"
        className="p-0 !mt-3 underline text-sm text-muted-foreground underline-offset-3 hover:text-primary"
      >
        Voltar ao login
      </Link>
    </>
  );
}
