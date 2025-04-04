import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";

export const mulish = Mulish({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mulish",
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Dcluttr FE",
  description: "Built by Tanmay Sarkar",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${mulish.variable} antialiased overflow-hidden`}>
        <div className="flex min-h-screen bg-white font-[mulish]">
          <Sidebar />
          <div className="h-[100vh] flex-1 overflow-y-scroll">{children}</div>
        </div>
      </body>
    </html>
  );
}
