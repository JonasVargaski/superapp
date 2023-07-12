import Image from "next/image";
import logo from "../../../public/superapp-logo.png";
import { MainNav } from "./components/main-nav";
import { Separator } from "@/components/ui/separator";
import { UserNav } from "./components/user-nav";

export const metadata = {
  title: "SuperApp",
  description: "Compilado de utilitários",
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-14 items-center">
          <Image src={logo} alt="logo" priority height={30} />
          <Separator orientation="vertical" className="mx-4 h-7" />
          <MainNav />
          <div className="ml-auto flex items-center space-x-4">
            <UserNav />
          </div>
        </div>
      </header>
      <div className="flex-1">{children}</div>
    </div>
  );
}
