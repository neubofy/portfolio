import type { Metadata } from "next";
import { Indie_Flower, Geist_Mono } from "next/font/google";
import "./globals.css";

const indieFlower = Indie_Flower({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: "400",
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pawan Washudev | AI Expert & Developer",
  description: "Portfolio of Pawan Washudev, an AI Expert and Web Engineer crafting intelligent digital ecosystems.",
  icons: {
    icon: '/favicon.ico',
  },
};

import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import NoiseOverlay from "@/components/NoiseOverlay";
import LiveBackground from "@/components/LiveBackground";
import Preloader from "@/components/Preloader";
import FloatingActions from "@/components/FloatingActions";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${indieFlower.variable} ${geistMono.variable} antialiased`}
      >
        <Preloader />
        <LiveBackground />
        <CustomCursor />
        <NoiseOverlay />
        <SmoothScroll>
          <FloatingActions />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
