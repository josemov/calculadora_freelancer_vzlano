import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const BASE_URL = "https://calculadorafreelancevzlano.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Calculadora de Tarifa para Freelancers | PayPal, Zinli y Binance",
    template: "%s | Calculadora Freelance",
  },
  description:
    "Calcula tu tarifa por hora como freelancer en Latinoamérica. Descubre exactamente cuánto cobrarle a tu cliente si paga por PayPal, Zinli o Binance para recibir tu monto neto sin perder dinero en comisiones.",
  keywords: [
    "calculadora tarifa freelancer",
    "tarifa por hora freelancer",
    "comisión PayPal freelancer",
    "comisión Zinli freelancer",
    "comisión Binance Pay",
    "calculadora freelancer latinoamerica",
    "cuánto cobrar freelancer",
    "comisión PayPal Venezuela",
    "comisión PayPal Colombia",
    "comisión PayPal México",
    "calculadora freelancer remoto",
    "tarifa hora trabajo remoto",
    "herramienta freelancer",
    "calcular comisión PayPal internacional",
    "Zinli pagos internacionales",
    "Binance Pay freelancer",
    "calculadora salario freelancer",
    "gastos freelancer",
    "precio por hora programador",
    "precio por hora diseñador freelance",
  ],
  authors: [{ name: "Calculadora Freelance" }],
  creator: "Calculadora Freelance",
  publisher: "Calculadora Freelance",
  category: "Finanzas personales",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_419",
    url: BASE_URL,
    siteName: "Calculadora Freelance",
    title: "Calculadora de Tarifa para Freelancers | PayPal, Zinli y Binance",
    description:
      "¿Cuánto cobrarle a tu cliente si paga por PayPal, Zinli o Binance? Calcula tu tarifa por hora y ajústala automáticamente según la comisión de cada plataforma. Gratis, sin registro.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Calculadora de Tarifa para Freelancers — PayPal, Zinli y Binance",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Calculadora de Tarifa para Freelancers | PayPal, Zinli y Binance",
    description:
      "Calcula tu tarifa por hora como freelancer y descubre cuánto cobrar si tu cliente paga por PayPal, Zinli o Binance para no perder dinero en comisiones.",
    images: ["/opengraph-image"],
    creator: "@calculadorafreelance",
  },
  alternates: {
    canonical: BASE_URL,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="dark">
      <body className={`${inter.className} bg-gray-950 text-gray-100 antialiased`}>
        {children}
      </body>
    </html>
  );
}
