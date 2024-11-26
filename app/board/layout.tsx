import PageList from "@/features/page-list/PageList";

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
