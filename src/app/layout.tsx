import { Inter } from "next/font/google";
import { TRPCProvider } from "./_trpc/provider";
import "~/styles/globals.css";

import { type Metadata } from "next";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "SymptomTrack - AI Symptom Analysis",
  description: "AI-powered symptom analysis and medical advice",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <TRPCProvider>{children}</TRPCProvider>
      </body>
    </html>
  );
}
