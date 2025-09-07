
'use client';

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  useSidebar,
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
  Telescope,
  Sigma,
  PanelLeftClose,
  PanelRightClose,
  FileQuestion
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/', label: 'Dashboard', icon: Home },
  { href: '/resources', label: 'Resources', icon: Book },
  { href: '/formulas', label: 'Formula Sheets', icon: Sigma },
  { href: '/question-bank', label: 'Question Bank', icon: FileQuestion },
  { href: '/mock-test', label: 'Mock Tests', icon: ClipboardList },
  { href: '/revision-planner', label: 'Revision Planner', icon: Calendar },
  { href: '/tagging', label: 'AI Tagger', icon: Tag },
  { href: '/topic-explorer', label: 'Topic Explorer', icon: Telescope },
  { href: '/doubt-solver', label: 'Doubt Solver', icon: HelpCircle },
];

function SidebarCollapseButton() {
    const { state, toggleSidebar } = useSidebar();
    const isCollapsed = state === 'collapsed';
    const Icon = isCollapsed ? PanelRightClose : PanelLeftClose;
    return (
        <SidebarMenuButton
            onClick={toggleSidebar}
            className="w-full justify-center"
            tooltip={{children: isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar', side: 'right'}}
        >
            <Icon />
            <span className="sr-only">Toggle Sidebar</span>
        </SidebarMenuButton>
    )
}


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
              <Link href={item.href}>
                <SidebarMenuButton
                  isActive={pathname === item.href}
                  tooltip={{ children: item.label }}
                >
                  <item.icon />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-2">
         <SidebarMenu>
            <SidebarMenuItem>
                 <Link href="/settings">
                    <SidebarMenuButton
                        isActive={pathname === '/settings'}
                        tooltip={{ children: 'Settings' }}
                    >
                        <Settings />
                        <span>Settings</span>
                    </SidebarMenuButton>
                 </Link>
            </SidebarMenuItem>
            <SidebarCollapseButton />
         </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
