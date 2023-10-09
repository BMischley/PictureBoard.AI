
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import TopBar from "@/components/navbar/TopBar";
import Footer from "@/components/footer/Footer";
import { Theme } from "@radix-ui/themes";
import LoadingWrapper from "@/components/wrappers/LoadingWrapper";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PictureBoard.AI",
  description: "We do pictureboards lol.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any"/>
      </head>
      <body className={inter.className}>
        <TopBar />
          <LoadingWrapper>
            {children}
          </LoadingWrapper>
        <Footer />
      </body>
    </html>
  );
}
