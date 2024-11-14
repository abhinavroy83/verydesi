import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <main>{children}</main>
      <Toaster />
    </div>
  );
}
