import { Icons } from "@/components/icons";
import Image from "next/image";
import logo from "../../../public/superapp-logo-light.png";

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

          <div className="relative z-20">
            <Image src={logo} alt="logo" priority width={200} />
          </div>

          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                SuperApp é um site que reúne vários recursos em um único lugar,
                para que você possa gerenciar suas automações de forma
                eficiente.
              </p>
              <footer className="text-sm flex flex-col items-end gap-1 pt-2">
                <p>Desenvolvido por: Jonas Vargaski</p>
                <div className="flex items-center mt-1 gap-3">
                  <a
                    href="https://www.linkedin.com/in/jonasvargaski/"
                    target="_blank"
                  >
                    <Icons.Linkedin className="h-6 w-6" />
                  </a>
                  <a
                    href="https://www.instagram.com/jonasvargaski/"
                    target="_blank"
                  >
                    <Icons.Instagram className="h-6 w-6" />
                  </a>
                  <a
                    href="https://wa.me/5548999065651?text=Olá! Vim através do site superapp."
                    target="_blank"
                  >
                    <Icons.WhatsApp className="h-6 w-6 text-green-600" />
                  </a>
                </div>
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
