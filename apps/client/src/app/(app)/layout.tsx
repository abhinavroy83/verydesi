import Footer from "@/components/Footer";
import LoginSlider from "@/components/login/login";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <div>
      <Navbar />
      {children}
      <Toaster position="top-right" reverseOrder={false} />
      <LoginSlider />
      <Footer />
    </div>
  );
}
