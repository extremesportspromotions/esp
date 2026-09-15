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
  title: "Extreme Sports Promotions | Match with Pro Coaches",
  description:
    "ESP connects students with professional extreme-sports coaches for a fee. Mountaineering, scuba, skydiving, surfing, and more.",
  openGraph: {
    title: "Extreme Sports Promotions",
    description:
      "Match with professional extreme-sports coaches. Fee-based coach matching for students and athletes.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ink text-foreground">
        {children}
      </body>
    </html>
  );
}
