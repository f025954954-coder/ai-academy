import type { Metadata, Viewport } from "next";
import { Heebo } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteHeader } from "@/components/layout/site-header";
import { AIMentorWidget } from "@/components/mentor/ai-mentor-widget";

const heebo = Heebo({
  variable: "--font-heebo",
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "אקדמיית AI | ללמוד לבנות בינה מלאכותית אמיתית",
  description:
    "האקדמיה המקצועית ללימוד הנדסת AI מאפס עד production — מבוססת פרויקטים, בעברית מלאה.",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#0B1120",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl" className={`${heebo.variable} h-full`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <SiteHeader />
          <main className="flex-1 flex flex-col">{children}</main>
          <AIMentorWidget />
        </ThemeProvider>
      </body>
    </html>
  );
}
