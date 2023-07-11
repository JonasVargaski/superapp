import { Metadata } from "next";
import Link from "next/link";

import { UserRegisterForm } from "./user-register-form";
import { AuthHeaderScaffold } from "../header-scaffold";

export const metadata: Metadata = {
  title: "SuperApp - Cadastro",
  description: "Faça seu cadastro para ter acesso à plataforma",
};

export default function RegisterPage() {
  return (
    <>
      <AuthHeaderScaffold.Root>
        <AuthHeaderScaffold.Title>Registre-se</AuthHeaderScaffold.Title>
        <AuthHeaderScaffold.Description>
          Ficamos felizes em ter você aqui, para começar precisamos de alguns
          dados.
        </AuthHeaderScaffold.Description>
      </AuthHeaderScaffold.Root>

      <UserRegisterForm />
      <p className="text-sm p-0 !mt-3 text-muted-foreground">
        Já possui conta?
        <Link
          href="/login"
          className="underline pl-2 underline-offset-3 hover:text-primary"
        >
          Acesse aqui.
        </Link>
      </p>
      <p className="px-8 text-center pt-1 text-sm text-muted-foreground">
        Ao clicar em continuar, você aceita nossos{" "}
        <Link
          href="/terms"
          className="underline underline-offset-3 hover:text-primary"
        >
          Termos de uso
        </Link>{" "}
        e{" "}
        <Link
          href="/privacy"
          className="underline underline-offset-3 hover:text-primary"
        >
          Politica de privacidade
        </Link>
        .
      </p>
    </>
  );
}
