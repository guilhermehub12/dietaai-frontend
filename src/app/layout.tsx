'use client'

import { Space_Mono } from "next/font/google";
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import "./globals.css";

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, // 5 minutes
        retry: 1,
      }
    }
  }))

  return (
    <QueryClientProvider client={queryClient}>
      <html lang="pt_BR">
      <body
        className={`${spaceMono.variable} bg-[#0F232C]`}
      >
        {children}
      </body>
    </html>
    </QueryClientProvider>
  );
}
