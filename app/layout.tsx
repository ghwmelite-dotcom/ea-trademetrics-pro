import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TelegramChat from "@/components/ui/TelegramChat";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TradeMetrics Pro EA Development | Professional MT4/MT5 Expert Advisors",
  description: "Professional Expert Advisor development for MT4/MT5. Convert your TradingView strategies to automated trading bots. Based in Accra, Ghana, serving traders worldwide.",
  keywords: ["MT4 EA development", "MT5 Expert Advisor", "TradingView conversion", "automated trading", "forex robot", "Ghana"],
  openGraph: {
    title: "TradeMetrics Pro EA Development",
    description: "Professional MT4/MT5 Expert Advisor development services",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans antialiased noise`}>
        <Header />
        <main className="relative">{children}</main>
        <Footer />
        <TelegramChat username="my_ea_hub" />
      </body>
    </html>
  );
}
