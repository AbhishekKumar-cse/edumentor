import { cn } from '@/lib/utils';
import { BookCopy } from 'lucide-react';
import React from 'react';

interface ChapterCardProps {
  title: string;
  questionCount: number;
  icon: React.ReactNode;
  color: string;
}

export const ChapterCard = ({
  title,
  questionCount,
  icon,
  color,
}: ChapterCardProps) => {
  return (
    <div
      className={cn(
        'p-4 rounded-lg flex flex-col justify-between h-36 relative overflow-hidden',
        color
      )}
    >
      <div className="text-white font-bold">{title}</div>
      <div className="flex justify-between items-center text-white/80">
        <div className="flex items-center gap-2 text-sm">
          <BookCopy className="w-4 h-4" />
          <span>{questionCount}</span>
        </div>
        <div className="w-8 h-8 flex items-center justify-center bg-white/20 rounded-full">
          {icon}
        </div>
      </div>
    </div>
  );
};
