import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.scss";
import { cn } from "@/lib/utils";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Intellypics",
  description: "AI-powered image generator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("font-roboto antialiased", roboto.variable)}>
        {children}
      </body>
    </html>
  );
}
