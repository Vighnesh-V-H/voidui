import React from "react";
import "../styles/globals.css";
import { Inter } from "next/font/google";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VoidUI - Modern React Components",
  description: "A modern, accessible React UI component library",
  openGraph: {
    title: "VoidUI - Modern React Components",
    description: "A modern, accessible React UI component library",
    url: "https://voidui.dev",
    siteName: "VoidUI",
  },
  twitter: {
    card: "summary_large_image",
    title: "VoidUI - Modern React Components",
    description: "A modern, accessible React UI component library",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
