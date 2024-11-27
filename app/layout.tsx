import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import "@/public/styles/main.scss";
import { Toaster } from "@/components/ui";

const NOTO_SANS_KR = Noto_Sans_KR({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Todo Board",
  description: "Shadcn UI + Next.js TODO-BOARD 만들기",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${NOTO_SANS_KR.className}`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
