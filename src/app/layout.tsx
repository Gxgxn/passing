import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Passing | A Moment in Time",
  description: "Some moments exist only once. This is one of them.",
  openGraph: {
    title: "Passing",
    description: "A website you can only visit once.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${outfit.variable} font-sans antialiased bg-zinc-950 text-white selection:bg-white/10`}>
        {children}
      </body>
    </html>
  );
}
