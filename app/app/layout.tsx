import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { permanentRedirect } from 'next/navigation';

import { urls } from 'config';

import { getUser } from 'app/actions/user';

import { AuthProvider } from 'components/context/auth';
import ThemeProvider from 'components/context/theme';
import Sidebar from 'components/sidebar';
import { Toaster } from 'components/ui/sonner';
import { TooltipProvider } from 'components/ui/tooltip';

import '../globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const title = 'Bookmark it. | Home';
const description = 'Bookmark manager for the modern web.';

export const metadata: Metadata = {
  metadataBase: new URL('https://bmrk.cc'),
  alternates: {
    canonical: '/',
  },
  title,
  description,
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    creator: '@gokul_i',
    images: ['/images/open-graph.jpg'],
  },
  openGraph: {
    type: 'website',
    title,
    description,
    url: 'https://bmrk.cc',
    images: ['/images/open-graph.jpg'],
  },
  icons: {
    icon: '/icons/favicon-32x32.png',
    shortcut: '/icons/icon.svg',
    apple: '/icons/apple-touch-icon.png',
  },
  appleWebApp: {
    title,
    statusBarStyle: 'default',
    startupImage: ['/icons/apple-icon.png'],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#ffffff',
  userScalable: false,
  viewportFit: 'cover',
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const user = await getUser();

  if (!user) {
    permanentRedirect(urls.account);
  }

  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className={`${inter.className} flex h-full`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider user={user}>
            <div className="max-w-[600px] m-auto flex min-h-dvh w-full">
              <TooltipProvider delayDuration={200}>
                <Sidebar />
                <main className="flex sm:ml-[69px] max-sm:pb-[69px] flex-col w-full min-h-[100vh] ">
                  {children}
                </main>
              </TooltipProvider>
            </div>
          </AuthProvider>
        </ThemeProvider>
        <Toaster
          richColors
          toastOptions={{ className: 'max-sm:mb-[4.5rem]' }}
        />
      </body>
    </html>
  );
}
