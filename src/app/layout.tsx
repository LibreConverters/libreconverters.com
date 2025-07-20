/*
 * Copyright 2025 Michael Wyatt
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Free Image Converter",
  description: "FREE & Open Source image converter. No intrusive ads, no tracking, no signups.",
  // robots: "noindex, nofollow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9181884142549970"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <nav className="flex justify-between items-center p-2 " style={{ zIndex: 9999, position: 'fixed', top: 0, left: 0, right: 0, backgroundColor: '#333', color: '#fff' }}>
          <div>
            <a href="/">
              <h1 className="text-2xl font-bold">Libre Converters</h1>
            </a>
          </div>
          <div className="flex space-x-4">
            <a href="/image-converter">Image Converter</a>
            <a href="/about">About</a>
            <a href="https://github.com/libreconverters/libreconverters.com">GitHub</a>
          </div>
        </nav>

        <main className="flex flex-col h-screen" style={{ paddingTop: '50px' }}>
          {children}
        </main>
      </body>
    </html>
  );
}
