import type { Metadata } from "next";
import "@/app/globals.css";
import "@/public/styles/main.scss";
import PageList from "@/features/page-list/PageList";

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
    <div className="page">
      <PageList />
      <main className="page__main">{children}</main>
    </div>
  );
}
