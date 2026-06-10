import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TechVocab - English for IT",
  description: "Interactive application for learning IT English terminology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      /* FIX: Ditambahkan bg-[#0B0F19] di sini untuk mengunci warna background dasar HTML */
      className={`${geistSans.variable} ${geistMono.variable} h-full bg-[#0B0F19] antialiased`}
    >
      <body className="min-h-full bg-[#0B0F19] text-slate-300 flex flex-col justify-between">
        
        <Navbar />

        <main className="flex-grow">
          {children}
        </main>

        <Footer />

      </body>
    </html>
  );
}