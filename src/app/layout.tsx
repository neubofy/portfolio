import type { Metadata } from "next";
import { Dancing_Script, Geist_Mono, Patrick_Hand } from "next/font/google"; // Switching to Dancing Script for "Beautiful" look
import "./globals.css";

const dancingScript = Dancing_Script({
  variable: "--font-dancing",
  subsets: ["latin"],
  display: 'swap',
  weight: ['400', '700'],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const patrickHand = Patrick_Hand({
  variable: "--font-patrick",
  subsets: ["latin"],
  display: 'swap',
  weight: '400',
});

export const metadata: Metadata = {
  title: "Sohan Kumar | AI Expert & Developer",
  description: "Portfolio of Sohan Kumar AKA Pawan Washudev an AI Expert and Web Engineer crafting intelligent digital ecosystems.",
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
        className={`${dancingScript.variable} ${geistMono.variable} ${patrickHand.variable} antialiased font-[family-name:var(--font-patrick)]`}
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
