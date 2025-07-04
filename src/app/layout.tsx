import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "正規表現リファレンス - RegEx Guide",
  description: "正規表現の包括的なリファレンスガイド。パターン、構文、実例を分かりやすく解説。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className="antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
        {children}
      </body>
    </html>
  );
}
