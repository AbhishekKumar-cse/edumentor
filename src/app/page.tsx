
'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import ExamCard from '@/components/ui/exam-card';
import { Button } from '@/components/ui/button';
import {
  Atom,
  FlaskConical,
  Calculator,
} from 'lucide-react';
import { useProfile } from '@/context/profile-context';
import { Skeleton } from '@/components/ui/skeleton';

const examCategories = [
  { name: 'JEE Main', logo: 'https://picsum.photos/40/40', tag: '2025 QS ADDED', tagColor: 'bg-red-500/20 text-red-400 border-red-500/30', href: '/mock-test' },
  { name: 'JEE Advanced', logo: 'https://picsum.photos/40/40', tag: '2025 QS ADDED', tagColor: 'bg-red-500/20 text-red-400 border-red-500/30', href: '/mock-test' },
  { name: 'NTA Abhyas (JEE Main)', logo: 'https://picsum.photos/40/40', tag: '2025 QS ADDED', tagColor: 'bg-red-500/20 text-red-400 border-red-500/30', href: '/mock-test' },
  { name: 'MHT CET', logo: 'https://picsum.photos/40/40', tag: '2025 Qs Added', tagColor: 'bg-red-500/20 text-red-400 border-red-500/30', href: '/mock-test' },
  { name: 'COMEDK', logo: 'https://picsum.photos/40/40', tag: '2025 Qs Added', tagColor: 'bg-red-500/20 text-red-400 border-red-500/30', href: '/mock-test' },
  { name: 'BITSAT', logo: 'https://picsum.photos/40/40', tag: '', href: '/mock-test' },
  { name: 'NDA', logo: 'https://picsum.photos/40/40', tag: '2024 Qs Added', tagColor: 'bg-red-500/20 text-red-400 border-red-500/30', href: '/mock-test' },
  { name: 'TS EAMCET', logo: 'https://picsum.photos/40/40', tag: '', href: '/mock-test' },
  { name: 'VITEEE', logo: 'https://picsum.photos/40/40', tag: '', href: '/mock-test' },
  { name: 'Manipal (MET)', logo: 'https://picsum.photos/40/40', tag: '', href: '/mock-test' },
  { name: 'IAT (IISER)', logo: 'https://picsum.photos/40/40', tag: '', href: '/mock-test' },
  { name: 'NEST (NISER)', logo: 'https://picsum.photos/40/40', tag: 'New', tagColor: 'bg-pink-500/20 text-pink-400 border-pink-500/30', href: '/mock-test' },
];

const subjects = [
  { name: 'Physics', icon: <Atom className="w-5 h-5" /> },
  { name: 'Chemistry', icon: <FlaskConical className="w-5 h-5" /> },
  { name: 'Mathematics', icon: <Calculator className="w-5 h-5" /> },
];


export default function HomePage() {
   const { profile, isLoading } = useProfile();

  return (
    <div className="space-y-8 pb-12">
      {isLoading || !profile ? (
        <header className="space-y-2">
            <Skeleton className="h-9 w-48" />
            <Skeleton className="h-6 w-64" />
        </header>
      ) : (
         <header className="space-y-2">
            <h1 className="text-3xl font-headline font-bold">
              Hey, {profile.name}!
            </h1>
            <p className="text-muted-foreground">
              Let's practice and conquer your exams.
            </p>
         </header>
      )}

      <section>
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            <CarouselItem>
              <Card className="border-0 overflow-hidden bg-yellow-400">
                <CardContent className="p-0">
                  <div className="relative aspect-[2/1] md:aspect-[3/1] lg:aspect-[4/1]">
                    <Image
                      src="https://picsum.photos/1200/400"
                      alt="Find your weak chapters"
                      fill
                      className="object-cover"
                      data-ai-hint="promotional banner"
                    />
                     <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent p-8 md:p-12 flex flex-col justify-center items-start text-white">
                        <Badge className="mb-2 bg-red-600 text-white border-0">Just Launched</Badge>
                        <p className="font-semibold">With Premium Filters</p>
                        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter">
                            Find Your <span className="text-yellow-400">Weak chapters</span>
                        </h2>
                     </div>
                      <div className="absolute right-8 md:right-12 top-1/2 -translate-y-1/2 text-center text-black bg-white/90 p-4 rounded-lg">
                        <p className="font-bold text-lg">Unlock Now</p>
                        <p className="text-sm">at 50% OFF</p>
                      </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </Carousel>
      </section>

      <section className="space-y-4">
        <div className="flex justify-between items-center">
            <h2 className="text-2xl font-headline font-bold">
            Chapter wise PYQ Bank
            </h2>
            <Button variant="link" className="text-primary">VIEW ALL</Button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {examCategories.map((exam) => (
            <ExamCard key={exam.name} {...exam} />
          ))}
        </div>
      </section>

       <section>
        <Card className="p-6 bg-secondary/30">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="flex-1 space-y-2">
              <h2 className="text-2xl font-headline font-bold">
                India's Best 99%iler's Question Bank
              </h2>
              <p className="text-muted-foreground">
                Practice the most relevant questions to get the best results in
                your exams.
              </p>
            </div>
            <div className="flex-shrink-0 flex flex-wrap gap-3">
              {subjects.map((subject) => (
                <Button key={subject.name} variant="outline" size="lg">
                  {subject.icon}
                  <span>{subject.name}</span>
                </Button>
              ))}
            </div>
          </div>
        </Card>
      </section>

    </div>
  );
}
