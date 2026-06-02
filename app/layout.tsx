import type { Metadata } from "next";
import { Cairo, Playfair_Display, Amiri, Reem_Kufi } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/LanguageProvider";

const cairo = Cairo({ 
  subsets: ["arabic"],
  variable: "--font-cairo",
  weight: ["400", "500", "600", "700"],
});

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const amiri = Amiri({
  subsets: ["arabic"],
  variable: "--font-amiri",
  weight: ["400", "700"],
  style: ["normal"],
});

const reemKufi = Reem_Kufi({
  subsets: ["arabic"],
  variable: "--font-reemkufi",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "زيكولا | Zykola - منصة دعوات الزفاف الرقمية",
  description: "صمّم دعوة زفافك الرقمية الفاخرة بكل سهولة وشاركها مع من تحب برابط مخصص وبطابع فخم ومميز.",
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
  themeColor: '#8B1A1A',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${cairo.variable} ${playfair.variable} ${amiri.variable} ${reemKufi.variable}`}>
      <body className="font-cairo antialiased">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
