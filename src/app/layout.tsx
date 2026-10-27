import type { Metadata } from "next";
import { Assistant, Frank_Ruhl_Libre } from "next/font/google";
import "./globals.css";

const assistant = Assistant({
  variable: "--font-assistant",
  subsets: ["hebrew", "latin"],
  display: "swap",
});

const frank = Frank_Ruhl_Libre({
  variable: "--font-frank",
  subsets: ["hebrew", "latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "מכון מקור חכמה | סופר סת״ם מוסמך · אלעד",
    template: "%s | מכון מקור חכמה",
  },
  description:
    "סופר סת״ם עם 32 שנות ניסיון, מוסמך משמרת סת״ם ויד רפאל. שיחת ייעוץ ואז פגישה באלעד.",
  openGraph: {
    type: "website",
    locale: "he_IL",
    siteName: "מכון מקור חכמה",
    images: [{ url: "/logo.jpg", width: 1200, height: 630, alt: "מכון מקור חכמה" }],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/logo.jpg",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="he" dir="rtl" className={`${assistant.variable} ${frank.variable} h-full`}>
      <body className="min-h-full font-body antialiased pb-24 md:pb-0">{children}</body>
    </html>
  );
}
