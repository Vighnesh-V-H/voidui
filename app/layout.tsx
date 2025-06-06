import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "VoidUi",
  description: "Component library for React",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
