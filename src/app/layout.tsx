import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "@/styles/globals.css";
import Script from "next/script";

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
      <body className={poppins.className}>
        <Script
          strategy="lazyOnload"
          src={`https://www.googletagmanager.com/gtag/js?id=G-DR5DB9Q2BG`}
        />

        <Script id="google-analytics-script" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-DR5DB9Q2BG', {
            page_path: window.location.pathname,
            });
          `}
        </Script>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
