import { Icons } from "@/components/icons";
import { LightbulbIcon } from "lucide-react";

export const metadata = {
  title: "Autenticação",
  description: "SuperApp - Autenticação",
};

export default function AuthenticationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="relative w-screen h-screen grid md:grid-cols-2 2xl:grid-cols-[1fr_724px] px-3 sm:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r md:flex">
          <div className="absolute inset-0 bg-zinc-900" />

          <div className="relative z-20 flex items-center text-lg font-medium">
            <LightbulbIcon className="mr-2 h-6 w-6 text-yellow-500" /> SuperApp
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                SuperApp é um site prático que reúne vários recursos úteis para
                simplificar seu dia-a-dia. Tudo isso em um único lugar, para que
                você possa gerenciar suas tarefas pessoais de forma eficiente.
              </p>
              <footer className="text-sm flex flex-col items-end gap-1 pt-2">
                <p>Desenvolvido por: Jonas Vargaski</p>
                <b className="flex items-center text-gray-200">
                  <Icons.WhatsApp className="mr-2 h-5 w-5 text-green-600" />
                  (48) 99906-5651
                </b>
              </footer>
            </blockquote>
          </div>
        </div>

        <div className="mx-auto flex h-full w-full flex-col justify-center space-y-6 sm:w-[370px]">
          {children}
        </div>
      </div>
    </>
  );
}
