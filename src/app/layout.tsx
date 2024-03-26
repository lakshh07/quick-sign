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
  robots: "index, follow",
  title: "Quick Signature",
  description: "Easily Create Your Signature in PNG Format Instantly",
  applicationName: "Quick Signature",
  authors: [{ name: "Lakshay Maini", url: "https://lakshaymaini.com" }],
  keywords: ["nextjs, tailwindcss, shadcn-ui, signature, quick sign, sign"],
  openGraph: {
    type: "website",
    url: "https://quicksign.vercel.app/",
    title: "Quick Signature",
    description: "Easily Create Your Signature in PNG Format Instantly",
    siteName: "Quick Signature",
    images: [
      {
        url: "https://i.postimg.cc/4NvGZjPV/Screenshot-2024-03-26-at-12-31-12-PM.png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@LakshayMaini_",
    images:
      "https://i.postimg.cc/4NvGZjPV/Screenshot-2024-03-26-at-12-31-12-PM.png",
    title: "Quick Signature",
    description: "Easily Create Your Signature in PNG Format Instantly",
  },
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
