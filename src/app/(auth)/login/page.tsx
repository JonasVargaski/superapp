import Link from "next/link";
import { Metadata } from "next";

import { UserLoginForm } from "./user-login-form";
import { AuthHeaderScaffold } from "../header-scaffold";

export const metadata: Metadata = {
  title: "SuperApp - Entrar",
  description: "Faça login para ter acesso à plataforma",
};

export default function LoginPage() {
  return (
    <>
      <AuthHeaderScaffold.Root>
        <AuthHeaderScaffold.Title>Entre no seu perfil</AuthHeaderScaffold.Title>
        <AuthHeaderScaffold.Description>
          Bem vindo(a) de volta. Entre com seu e-email ou conta Google.
        </AuthHeaderScaffold.Description>
      </AuthHeaderScaffold.Root>

      <UserLoginForm />
      <p className="text-sm text-muted-foreground">
        Não possui conta?
        <Link
          href="/register"
          className="underline pl-2 underline-offset-3 hover:text-primary"
        >
          Cadastre-se
        </Link>
      </p>
    </>
  );
}
