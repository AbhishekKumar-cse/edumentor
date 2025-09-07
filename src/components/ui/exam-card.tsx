
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
  return (
    <Link href={href} className="flex flex-col">
      <Card className="group bg-secondary/30 hover:bg-primary/10 hover:border-primary transition-all duration-300 cursor-pointer h-full flex-1">
        <CardContent className="p-4 flex flex-col items-center justify-center text-center gap-3">
          <div className="relative h-12 w-12 bg-white/10 rounded-full flex items-center justify-center p-2">
            <Image
              src={logo}
              alt={`${name} logo`}
              width={32}
              height={32}
              className="object-contain"
            />
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-semibold">{name}</h3>
          </div>
        </CardContent>
      </Card>
      {tag && (
        <Badge variant="outline" className={cn("text-xs mt-2 mx-auto border", tagColor)}>
            {tag}
        </Badge>
      )}
    </Link>
  );
}
