'use client';

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Logo } from '@/components/icons';
import {
  Home,
  Book,
  ClipboardList,
  Calendar,
  HelpCircle,
  Tag,
  Settings,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/', label: 'Dashboard', icon: Home },
  { href: '/resources', label: 'Resources', icon: Book },
  { href: '/mock-test', label: 'Mock Tests', icon: ClipboardList },
  { href: '/revision-planner', label: 'Revision Planner', icon: Calendar },
  { href: '/tagging', label: 'AI Tagger', icon: Tag },
  { href: '/doubt-solver', label: 'Doubt Solver', icon: HelpCircle },
];

export default function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar
      className="border-r"
      variant="sidebar"
      collapsible="icon"
    >
      <SidebarHeader className="h-16 justify-center p-4">
        <Link href="/" className="flex items-center gap-2">
          <Logo className="h-8 w-8 text-primary" />
          <span className="text-xl font-headline font-bold text-foreground">
            EduMentor
          </span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="flex-1 p-2">
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} passHref>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
                  tooltip={{ children: item.label }}
                >
                  <a href={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                  </a>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-2">
         {/* Footer content can be added here if needed in the future */}
      </SidebarFooter>
    </Sidebar>
  );
}
