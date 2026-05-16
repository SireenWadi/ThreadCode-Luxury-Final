import type { Metadata } from "next";
import "./globals.css";
import { Navigation } from "@/components/layout/Navigation";
import { CodeWatermark } from "@/components/ui/CodeWatermark";
import { CartProvider } from "@/context/CartContext";
import { CartFlyProvider } from "@/context/CartFlyContext";
import { CartDrawer } from "@/components/ui/CartDrawer";
import { LuxuryLoader } from "@/components/ui/LuxuryLoader";
import { LuxuryCursor } from "@/components/ui/LuxuryCursor";

export const metadata: Metadata = {
  title: "ThreadCode — Luxury AI Styling",
  description: "ThreadCode is a luxury AI-powered fashion platform that curates bespoke outfits for every occasion. Quiet luxury. Intelligent design.",
  keywords: "luxury fashion, AI styling, personal stylist, bespoke outfits",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@200;300;400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
        <CartProvider>
          <CartFlyProvider>
            <LuxuryLoader />
            <LuxuryCursor />
            <CodeWatermark />
            <Navigation />
            <CartDrawer />
            <main className="relative z-10 page-transition-wrapper">{children}</main>
          </CartFlyProvider>
        </CartProvider>
      </body>
    </html>
  );
}
