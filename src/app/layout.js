import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: 'Trick Studios',
  description: 'We grew up playing videogames, Now we make them',
};

export default function RootLayout({ children }) {


  return (
    <html className="scroll-smooth" lang="en">
      <body className={inter.className}>

            {children}
      </body>
    </html>
  );
}
