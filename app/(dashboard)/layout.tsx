import { AuthProvider } from "@/context/AuthContext";
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import { Toaster } from "react-hot-toast";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <div className="flex min-h-screen">
        <Sidebar />

        <div className="flex flex-col flex-1">
          <Navbar />

          <main className="p-6">
            {children}
          </main>
        </div>
      </div>

      {/* 🔥 TOASTER – HALKAN AYUU JOOGAA */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            zIndex: 9999,
          },
        }}
      />
    </AuthProvider>
  );
}
