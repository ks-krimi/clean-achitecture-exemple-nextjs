"use client";

import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "The page you are looking for does not exist.",
};

export default function GlobalNotFound() {
  return (
    <html lang="en" className={inter.className}>
      <body className="bg-gray-50 flex items-center justify-center min-h-screen p-8">
        <main className="text-center">
          <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-700 mb-2">
            Page Not Found
          </h2>
          <p className="text-gray-500 mb-6">
            The page you are looking for does not exist.
          </p>
          <Link
            href="/"
            replace
            scroll
            className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = "/";
            }}
          >
            Go back home
          </Link>
        </main>
      </body>
    </html>
  );
}
