import type { Metadata } from "next";
import { Bebas_Neue, Inter, Noto_Sans_TC } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

const bebas = Bebas_Neue({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: "400",
});

const notoSansTc = Noto_Sans_TC({
  variable: "--font-noto-tc",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CATCH JIU JITSU Portal",
  description: "Member portal and admin dashboard for CATCH JIU JITSU.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body className={`${inter.variable} ${bebas.variable} ${notoSansTc.variable} bg-background text-foreground antialiased`}>
        <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(0,212,255,0.08),_transparent_24%),linear-gradient(180deg,_rgba(15,23,42,0.98),_rgba(2,6,23,1))]">
          {children}
        </div>
      </body>
    </html>
  );
}
