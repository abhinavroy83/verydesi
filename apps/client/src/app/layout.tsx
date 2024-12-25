import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import AuthProvider from "@/context/AuthProvider";
import { Toaster } from "@/components/ui/toaster";
import { Open_Sans } from "next/font/google";
import Head from "next/head";
import { GoogleAnalytics } from "@next/third-parties/google";
import CitySelector from "@/components/Area/city-selector";

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

const helvetica = localFont({
  src: [
    {
      path: "./fonts/helvetica.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/helvetica-bold.woff",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-helvetica",
});

const FAVICON_URL =
  "https://res.cloudinary.com/druohnmyv/image/upload/v1729843667/lume1vaskd4swknuhexd.png";

export const metadata: Metadata = {
  title: "Verydesi",
  description:
    "VeryDesi helps you find rooms and roommates in the USA with ease. Discover affordable options in your area now.",
  keywords: "rooms, roommates, USA, affordable housing, room rentals",
  icons: {
    icon: [
      { url: `${FAVICON_URL}?v=1`, sizes: "32x32", type: "image/png" },
      { url: `${FAVICON_URL}?v=1`, sizes: "16x16", type: "image/png" },
      { url: `${FAVICON_URL}?v=1`, sizes: "any" },
    ],
    apple: { url: `${FAVICON_URL}?v=1`, sizes: "180x180", type: "image/png" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href={`${FAVICON_URL}?v=2`} />
        <link rel="apple-touch-icon" href={`${FAVICON_URL}?v=2`} />
      </Head>
      <AuthProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} ${openSans.className} ${helvetica.variable} antialiased`}
        >
          {children}
          <GoogleAnalytics gaId="G-0TC5ZZ5FMP" />

          <Toaster />
        </body>
      </AuthProvider>
    </html>
  );
}
