import type { Metadata } from "next";
import "./globals.css";

import AppProviders from "@/client/providers/AppProviders";

export const metadata: Metadata = {
  title: "Gallery",
  description: "A simple gallery app built with Next.js and Tailwind CSS"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
