import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const serif = Cormorant_Garamond({
  variable: "--font-serif-face",
  subsets: ["latin"],
  weight: ["500", "600"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#0E2141",
};

export const metadata: Metadata = {
  appleWebApp: { title: "ESP", capable: true },
  metadataBase: new URL(SITE_URL),
  title: "Extreme Sports Promotions | Get trained by a pro",
  description:
    "Get trained by a pro. We find you the right UK coach across 15 extreme sports, from skydiving to surfing.",
  icons: {
    icon: [{ url: "/favicon-32.png", sizes: "32x32", type: "image/png" }],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    title: "Extreme Sports Promotions",
    description:
      "Get trained by a pro. We find you the right UK coach across 15 extreme sports, from skydiving to surfing.",
    type: "website",
    images: [{ url: "/logo.png", width: 1200, height: 630, alt: "Extreme Sports Promotions stag logo" }],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-GB"
      className={`${geistSans.variable} ${geistMono.variable} ${serif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F6EFE3] text-foreground">
        {children}
      </body>
    </html>
  );
}
