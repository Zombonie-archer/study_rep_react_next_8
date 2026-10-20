import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto } from "next/font/google";
import "./globals.css";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import TanstackProvider from "../components/TanStackProvider/TanStackProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

interface LayoutProps {
  children: React.ReactNode;
  modal: React.ReactNode;
}

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const robotoFont = Roboto({
  weight: "400",
  subsets: ["latin"],
  variable: "--roboto-font",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NoteHub",
  description: "NoteHub app",
  openGraph: {
    title: "NoteHub",
    description: "NoteHub app",
    url: "https://study_rep_react_next_8.vercel.app/",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub app",
      },
    ],
  },
};

export default function RootLayout({ children, modal }: LayoutProps) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className={robotoFont.variable}>
        <TanstackProvider>
          <ReactQueryDevtools initialIsOpen={false} />
          <Header />
          {children}
          {modal}
          <Footer />
        </TanstackProvider>
      </body>
    </html>
  );
}
