import type { Metadata } from "next";
import "./globals.css";
import AppShell from "@/components/layout/AppShell";

export const metadata: Metadata = {
  title: "SatQuery AI - Interactive Earth Observation Intelligence",
  description: "An Interactive Vision-Language Assistant for Multimodal Remote Sensing Image Analysis",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased dark">
      <body className="min-h-full flex flex-col bg-brand-bg text-brand-text">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
