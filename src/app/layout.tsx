import "./globals.css";
import { Inter } from "next/font/google";
import { RootProviders } from "./providers";

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
      <body className={inter.className}>
        <RootProviders>{children}</RootProviders>
      </body>
    </html>
  );
}
