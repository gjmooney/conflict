import NavSidebar from "@/components/nav/NavSidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full">
      <div className="inset-y-0 z-30 hidden h-full w-[72px] flex-col md:flex">
        <NavSidebar />
      </div>
      <main className="md:pl-[72px] "> {children}</main>
    </div>
  );
}
