
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
  FileQuestion,
  Trophy,
  FilePlus2,
  BookOpen,
  ChevronUp,
  ChevronDown
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRef } from 'react';

const navItems = [
  { href: '/', label: 'Dashboard', icon: Home },
  { href: '/resources', label: 'Resources', icon: Book },
  { href: '/formulas', label: 'Formula Sheets', icon: Sigma },
  { href: '/theory', label: 'Theory', icon: BookOpen },
  { href: '/question-bank', label: 'Question Bank', icon: FileQuestion },
  { href: '/mock-test', label: 'Mock Tests', icon: ClipboardList },
  { href: '/dpp', label: 'DPP', icon: FilePlus2 },
  { href: '/revision-planner', label: 'Revision Planner', icon: Calendar },
  { href: '/tagging', label: 'AI Tagger', icon: Tag },
  { href: '/topic-explorer', label: 'Topic Explorer', icon: Telescope },
  { href: '/doubt-solver', label: 'Doubt Solver', icon: HelpCircle },
  { href: '/achievements', label: 'Achievements', icon: Trophy },
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
  const scrollableContentRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: 'up' | 'down') => {
    if (scrollableContentRef.current) {
        const scrollAmount = direction === 'up' ? -200 : 200;
        scrollableContentRef.current.scrollBy({ top: scrollAmount, behavior: 'smooth' });
    }
  };

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
      <SidebarContent ref={scrollableContentRef} className="flex-1 p-2">
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
                <SidebarMenuButton onClick={() => handleScroll('up')} className="w-full justify-center">
                    <ChevronUp />
                </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
                <SidebarMenuButton onClick={() => handleScroll('down')} className="w-full justify-center">
                    <ChevronDown />
                </SidebarMenuButton>
            </SidebarMenuItem>
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
