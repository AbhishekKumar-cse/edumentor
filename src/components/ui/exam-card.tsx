
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';

interface ExamCardProps {
  name: string;
  logo: string;
  tags: string[];
  href: string;
}

export default function ExamCard({ name, logo, tags, href }: ExamCardProps) {
  return (
    <Link href={href}>
      <Card className="group bg-secondary/30 hover:bg-primary/10 hover:border-primary transition-all duration-300 cursor-pointer h-full">
        <CardContent className="p-6 flex flex-col items-start gap-4">
          <div className="flex items-center justify-between w-full">
            <div className="relative h-12 w-12 bg-white rounded-full flex items-center justify-center">
              <Image
                src={logo}
                alt={`${name} logo`}
                width={32}
                height={32}
                className="object-contain"
              />
            </div>
            <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-transform" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-headline font-bold">{name}</h3>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
