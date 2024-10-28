import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import AuthProvider from "@/context/AuthProvider";
import { Toaster } from "@/components/ui/toaster";
import { Open_Sans } from "next/font/google";
import Head from "next/head";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const FAVICON_URL =
  "https://res.cloudinary.com/druohnmyv/image/upload/v1729843667/lume1vaskd4swknuhexd.png";

export const metadata: Metadata = {
  title: "Verydesi",
  description:
    "VeryDesi is the ultimate platform for the Indian community to connect, share, and explore. Find rooms, events, and more.",
  keywords: ["Indian community", "room finder", "events", "desi", "culture"],
  openGraph: {
    title: "VeryDesi - Your Indian Community Platform",
    description:
      "Connect with the Indian community, find rooms, and explore events on VeryDesi.",
    url: "https://verydesi.com",
    siteName: "VeryDesi",
    // images: [
    //   {
    //     url: 'https://verydesi.com/og-image.jpg',
    //     width: 1200,
    //     height: 630,
    //   },
    // ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VeryDesi - Your Indian Community Platform",
    description:
      "Connect with the Indian community, find rooms, and explore events on VeryDesi.",
    // images: ['https://verydesi.com/og-image.jpg'],
  },
  metadataBase: new URL("https://verydesi.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} ${openSans.className} antialiased`}
        >
          {children}
          <Toaster />
        </body>
      </AuthProvider>
    </html>
  );
}
