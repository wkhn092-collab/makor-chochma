import type { Metadata } from "next";
import { headers } from "next/headers";
import { Assistant, Frank_Ruhl_Libre } from "next/font/google";
import { NonceProvider } from "@/components/NonceProvider";
import { SkipLinkHost } from "@/components/SkipLinkHost";
import "./globals.css";

const assistant = Assistant({
  variable: "--font-assistant",
  subsets: ["hebrew", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
});

const frank = Frank_Ruhl_Libre({
  variable: "--font-frank",
  subsets: ["hebrew", "latin"],
  weight: ["400", "700"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "מכון מקור חכמה · אלעד",
    template: "%s | מכון מקור חכמה",
  },
  description: "סת״ם אצל הסופר · שיחת ייעוץ ופגישה באלעד",
  openGraph: {
    type: "website",
    locale: "he_IL",
    siteName: "מכון מקור חכמה",
    title: "מכון מקור חכמה · אלעד",
    description: "סת״ם אצל הסופר · שיחת ייעוץ ופגישה באלעד",
    // Static path + version query — busts WhatsApp/iMessage caches
    images: [
      {
        url: "/og.jpg?v=5",
        width: 1200,
        height: 1200,
        alt: "מכון מקור חכמה",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "מכון מקור חכמה · אלעד",
    description: "סת״ם אצל הסופר · שיחת ייעוץ ופגישה באלעד",
    images: ["/og.jpg?v=5"],
  },
  icons: {
    icon: [{ url: "/logo.jpg", type: "image/jpeg" }],
    apple: "/logo.jpg",
    shortcut: "/logo.jpg",
  },
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const h = await headers();
  const nonce = h.get("x-nonce") ?? undefined;

  return (
    <html lang="he" dir="rtl" className={`${assistant.variable} ${frank.variable} h-full`}>
      <body className="min-h-full font-body antialiased">
        <NonceProvider nonce={nonce}>
          <SkipLinkHost />
          {children}
        </NonceProvider>
      </body>
    </html>
  );
}
