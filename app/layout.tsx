import type { Metadata } from "next";
import { Inter, Cairo, Playfair_Display } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/LanguageProvider";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

const cairo = Cairo({ 
  subsets: ["arabic"],
  variable: "--font-cairo",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "زيكولا | Zykola - منصة دعوات الزفاف الرقمية",
  description: "صمّم دعوة زفافك الرقمية الفاخرة بكل سهولة وشاركها مع من تحب برابط مخصص وبطابع فخم ومميز.",
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    viewportFit: 'cover',
  },
  themeColor: '#8B1A1A',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${inter.variable} ${cairo.variable} ${playfair.variable}`}>
      <body className="font-cairo antialiased">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
