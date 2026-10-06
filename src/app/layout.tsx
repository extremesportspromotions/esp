import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#1E8CFF",
};

export const metadata: Metadata = {
  appleWebApp: { title: "ESP", capable: true },
  metadataBase: new URL(SITE_URL),
  title: "Extreme Sports Promotions | Get trained by a pro",
  description:
    "Get trained by a pro. Free enquiry. We find you a named UK coach across 15 extreme sports, from skydiving to surfing.",
  icons: {
    icon: [{ url: "/favicon-32.png", sizes: "32x32", type: "image/png" }],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    title: "Extreme Sports Promotions",
    description:
      "Get trained by a pro. Free enquiry. We find you a named UK coach across 15 extreme sports, from skydiving to surfing.",
    type: "website",
    images: [{ url: "/logo.png", alt: "Extreme Sports Promotions" }],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-GB"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#EEF4FA] text-foreground">
        {children}
      </body>
    </html>
  );
}
