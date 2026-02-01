import PublicNavbar from "@/components/layout/PublicNavbar";
import PublicFooter from "@/components/layout/PublicFooter";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Fixed Navbar */}
      <PublicNavbar />

      {/* Page Content */}
      <main className="flex-1 pt-[112px]">
        <div className="mx-auto max-w-7xl px-6">
          {children}
        </div>
      </main>

      {/* Footer */}
      <PublicFooter />
    </div>
  );
}
