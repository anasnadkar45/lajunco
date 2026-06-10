import type { Metadata } from "next";
import { Amiri, Cairo, Noto_Naskh_Arabic, Scheherazade_New } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageProvider";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "./api/uploadthing/core";
import { Toaster } from "@/components/ui/sonner";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["latin", "arabic"],
  weight: ["300", "400", "600", "700", "900"],
  display: "swap",
});

const notoNaskh = Noto_Naskh_Arabic({
  variable: "--font-noto-naskh",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lajunco.com"),

  title: {
    default: "Lajun Security Services | Private Security Company in Saudi Arabia",
    template: "%s | Lajun Security Services",
  },

  description:
    "LAJUN Security Services is a Saudi company specialized in private security services, providing professional guarding, facility security, access control, patrols, event security, and surveillance solutions across the Kingdom.",

  icons: {
    icon: [
      {
        url: "/favicon.ico",
        sizes: "32x32",
      },
      {
        url: "/logo.png",
        type: "image/png",
        sizes: "512x512",
      },
    ],
    apple: [
      {
        url: "/logo.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },

  openGraph: {
    title: "Lajun Security Services | Private Security Company in Saudi Arabia",
    description:
      "Professional private security services built on discipline, readiness, operational efficiency, and reliable field supervision across Saudi Arabia.",
    url: "https://lajunco.com",
    siteName: "Lajun Security Services",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Lajun Security Services Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Lajun Security Services | Private Security Company in Saudi Arabia",
    description:
      "Saudi private security company providing facility security, guarding services, patrols, access control, event security, and surveillance solutions.",
    images: ["/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: "https://lajunco.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      suppressHydrationWarning
      className={`${cairo.variable} h-full antialiased`}
    >
      <body>
        <NextSSRPlugin
          /**
           * The `extractRouterConfig` will extract **only** the route configs
           * from the router to prevent additional information from being
           * leaked to the client. The data passed to the client is the same
           * as if you were to fetch `/api/uploadthing` directly.
           */
          routerConfig={extractRouterConfig(ourFileRouter)}
        />
        <LanguageProvider>{children}</LanguageProvider>
        <Toaster />
      </body>

    </html>
  );
}
