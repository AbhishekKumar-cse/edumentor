import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from '@/components/layout/sidebar';
import Header from '@/components/layout/header';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from "next-themes";

export const metadata: Metadata = {
  title: 'EduMentor AI',
  description: 'AI-Powered Learning Companion',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Space+Grotesk:wght@500;700&family=Source+Code+Pro&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={cn('font-body antialiased', 'min-h-screen bg-background')}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <SidebarProvider>
            <div className="flex min-h-screen">
                <AppSidebar />
                <div className="flex flex-1 flex-col">
                <Header />
                <main className="flex-1 p-4 md:p-8">{children}</main>
                </div>
            </div>
            </SidebarProvider>
            <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
