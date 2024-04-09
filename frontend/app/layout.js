import { Inter } from "next/font/google";
import "./globals.css";
import ProvideAuth from "@/contexts/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "TaskApp",
  description: "Add some cool description here",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full`}>
        <ProvideAuth>{children}</ProvideAuth>
      </body>
    </html>
  );
}
