
'use client';

import { usePathname } from 'next/navigation';
import { SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from '@/components/layout/sidebar';
import Header from '@/components/layout/header';

export default function AppContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDoubtSolverPage = pathname.startsWith('/doubt-solver');
  const isDppStartPage = pathname.startsWith('/dpp/start');

  if (isDoubtSolverPage || isDppStartPage) {
    return <main>{children}</main>;
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <AppSidebar />
        <div className="flex flex-1 flex-col">
          <Header />
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
