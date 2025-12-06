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
  title: "Pawan Washudev | AI Expert & Developer",
  description: "Portfolio of Pawan Washudev, an AI Expert and Web Engineer crafting intelligent digital ecosystems.",
  icons: {
    icon: [
      { url: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>⚡</text></svg>', type: 'image/svg+xml' },
    ],
  },
};

import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import NoiseOverlay from "@/components/NoiseOverlay";
import LiveBackground from "@/components/LiveBackground";
import FloatingActions from "@/components/FloatingActions";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SmoothScroll>
          <LiveBackground />
          <CustomCursor />
          <NoiseOverlay />
          <FloatingActions />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
