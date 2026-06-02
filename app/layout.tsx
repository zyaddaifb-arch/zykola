import type { Metadata } from "next";
import { Inter, Cairo, Playfair_Display, Amiri } from "next/font/google";
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

const amiri = Amiri({
  subsets: ["arabic"],
  variable: "--font-amiri",
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "زيكولا | Zykola — دعوات زفاف رقمية فاخرة",
  description: "صمّم دعوة زفافك الرقمية الفاخرة في دقائق وشاركها مع أحبائك برابط مميز. تصاميم احترافية، موسيقى ترحيبية، وألبوم صور حي.",
  keywords: ["دعوة زفاف", "دعوة رقمية", "زفاف", "wedding invitation", "zykola", "زيكولا"],
  themeColor: '#8B1A1A',
  openGraph: {
    title: "زيكولا — دعوات زفاف رقمية فاخرة",
    description: "صمّم دعوة زفافك الرقمية الفاخرة في دقائق",
    type: 'website',
    locale: 'ar_SA',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${inter.variable} ${cairo.variable} ${playfair.variable} ${amiri.variable}`}>
      <body className="font-cairo antialiased">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
