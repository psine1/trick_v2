'use client';

import { Inter } from "next/font/google";
import "./globals.css";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {


  return (
    <html className="scroll-smooth" lang="en">
      <Head>
        <title>Trick Studios</title>
        <meta name="description" content="We grew up playing videogames, Now we make them" />
      </Head>
      <body className={inter.className}>

            {children}
      </body>
    </html>
  );
}
