import "./globals.css";
import { Inter } from "next/font/google";
import { RootProviders } from "./providers";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SuperApp",
  description: "Compilado de utilitários",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className={cn(inter.className, "min-h-screen bg-background")}>
        <RootProviders>{children}</RootProviders>
      </body>
    </html>
  );
}
