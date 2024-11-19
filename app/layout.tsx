import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import "@/app/styles/main.scss";

const NOTO_SANS_KR = Noto_Sans_KR({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Next.js Todo Project",
  description: "Shadcn UI + Next.js TODO-BOARD 만들기",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${NOTO_SANS_KR.className}`}>{children}</body>
    </html>
  );
}
