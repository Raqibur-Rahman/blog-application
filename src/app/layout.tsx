import "./globals.css";
import type { Metadata } from "next";
import navbar from "../components/Navbar/Navbar";
import Navbar from "../components/Navbar/Navbar";

export const metadata: Metadata = {
  title: "My Blog",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar></Navbar>
        {children}
      </body>
    </html>
  );
}
