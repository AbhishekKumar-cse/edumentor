
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface ExamCardProps {
  name: string;
  logo: string;
  tag: string;
  href: string;
  tagColor?: string;
}

export default function ExamCard({ name, logo, tag, href, tagColor }: ExamCardProps) {
  const isComingSoon = tag === 'COMING SOON';
  return (
    <div className="w-36 flex-shrink-0">
        <Link href={isComingSoon ? '#' : href} className="flex flex-col group">
            <Card className="bg-secondary/30 group-hover:bg-primary/10 group-hover:border-primary transition-all duration-300 cursor-pointer h-full flex-1 flex flex-col">
                <CardContent className="p-4 flex flex-col items-center justify-center text-center gap-3 flex-1">
                <div className="relative h-16 w-16 bg-background/50 rounded-full flex items-center justify-center p-2 group-hover:bg-primary/20 transition-all">
                    <Image
                    src={logo}
                    alt={`${name} logo`}
                    width={40}
                    height={40}
                    className="object-contain"
                    />
                </div>
                <div className="space-y-2">
                    <h3 className="text-base font-semibold">{name}</h3>
                </div>
                </CardContent>
                {tag && (
                    <div className="p-2 text-center">
                        <Badge variant="outline" className={cn("text-xs border", isComingSoon ? 'bg-gray-500/20 text-gray-400 border-gray-500/30' : tagColor)}>
                            {tag}
                        </Badge>
                    </div>
                )}
            </Card>
        </Link>
    </div>
  );
}
