import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://alizenmart.com"),
  title: {
    default: "Alizenmart - Best Online Shopping in Bangladesh",
    template: "%s | Alizenmart",
  },
  description: "Explore Alizenmart for high-quality gadgets, smart electronics, home & lifestyle, beauty, fashion, and baby products with super-fast delivery and secure checkout in Bangladesh.",
  keywords: ["e-commerce", "online shopping", "Bangladesh", "gadgets", "fashion", "lifestyle", "smart watch", "Alizenmart"],
  authors: [{ name: "Alizenmart Team" }],
  creator: "Alizenmart",
  publisher: "Alizenmart",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://alizenmart.com",
    siteName: "Alizenmart",
    title: "Alizenmart - Best Online Shopping in Bangladesh",
    description: "Explore Alizenmart for high-quality gadgets, smart electronics, home & lifestyle, beauty, fashion, and baby products with super-fast delivery in Bangladesh.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Alizenmart - Premium Shopping Hub",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alizenmart - Best Online Shopping in Bangladesh",
    description: "Explore Alizenmart for high-quality gadgets, smart electronics, home & lifestyle, beauty, fashion, and baby products.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "/",
  },
};

import { CartProvider } from "@/context/CartContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
