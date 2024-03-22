import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "@/styles/globals.css";
import { GoogleTagManager } from "@next/third-parties/google";

const poppins = Poppins({
  weight: ["400", "500", "600"],
  subsets: ["devanagari", "latin"],
  style: "normal",
});

export const metadata: Metadata = {
  title: "Quick Signature",
  description: "Easily Create Your Signature in PNG Format Instantly",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <GoogleTagManager gtmId="G-DR5DB9Q2BG" />
      <body className={poppins.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
