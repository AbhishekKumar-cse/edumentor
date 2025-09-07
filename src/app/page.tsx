
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
  BookCopy,
  PencilRuler,
  Flame,
  ChevronRight
} from 'lucide-react';
import { useProfile } from '@/context/profile-context';
import { Skeleton } from '@/components/ui/skeleton';

const examCategories = [
  { name: 'JEE Main', logo: 'https://picsum.photos/40/40', tag: '2025 QS ADDED', tagColor: 'bg-red-500/20 text-red-400 border-red-500/30', href: '/mock-test' },
  { name: 'JEE Advanced', logo: 'https://picsum.photos/40/40', tag: '2025 QS ADDED', tagColor: 'bg-red-500/20 text-red-400 border-red-500/30', href: '/mock-test' },
  { name: 'Boards', logo: 'https://picsum.photos/40/40', tag: 'New', tagColor: 'bg-pink-500/20 text-pink-400 border-pink-500/30', href: '/mock-test' },
  { name: 'NTA Abhyas (JEE Main)', logo: 'https://picsum.photos/40/40', tag: 'COMING SOON', tagColor: 'bg-gray-500/20 text-gray-400 border-gray-500/30', href: '#' },
  { name: 'MHT CET', logo: 'https://picsum.photos/40/40', tag: 'COMING SOON', tagColor: 'bg-gray-500/20 text-gray-400 border-gray-500/30', href: '#' },
  { name: 'COMEDK', logo: 'https://picsum.photos/40/40', tag: 'COMING SOON', tagColor: 'bg-gray-500/20 text-gray-400 border-gray-500/30', href: '#' },
  { name: 'BITSAT', logo: 'https://picsum.photos/40/40', tag: 'COMING SOON', tagColor: 'bg-gray-500/20 text-gray-400 border-gray-500/30', href: '#' },
  { name: 'NDA', logo: 'https://picsum.photos/40/40', tag: 'COMING SOON', tagColor: 'bg-gray-500/20 text-gray-400 border-gray-500/30', href: '#' },
  { name: 'TS EAMCET', logo: 'https://picsum.photos/40/40', tag: 'COMING SOON', tagColor: 'bg-gray-500/20 text-gray-400 border-gray-500/30', href: '#' },
  { name: 'VITEEE', logo: 'https://picsum.photos/40/40', tag: 'COMING SOON', tagColor: 'bg-gray-500/20 text-gray-400 border-gray-500/30', href: '#' },
  { name: 'Manipal (MET)', logo: 'https://picsum.photos/40/40', tag: 'COMING SOON', tagColor: 'bg-gray-500/20 text-gray-400 border-gray-500/30', href: '#' },
  { name: 'IAT (IISER)', logo: 'https://picsum.photos/40/40', tag: 'COMING SOON', tagColor: 'bg-gray-500/20 text-gray-400 border-gray-500/30', href: '#' },
  { name: 'NEST (NISER)', logo: 'https://picsum.photos/40/40', tag: 'COMING SOON', tagColor: 'bg-gray-500/20 text-gray-400 border-gray-500/30', href: '#' },
  { name: 'CUET', logo: 'https://picsum.photos/40/40', tag: 'COMING SOON', tagColor: 'bg-gray-500/20 text-gray-400 border-gray-500/30', href: '#' },
];


const subjects = [
  { name: 'Physics', icon: <Atom className="w-5 h-5" /> },
  { name: 'Chemistry', icon: <FlaskConical className="w-5 h-5" /> },
  { name: 'Mathematics', icon: <Calculator className="w-5 h-5" /> },
];

const digitalBooks = [
  { title: 'Backlog से Azadi', exam: 'JEE MAIN 2026', image: 'https://picsum.photos/200/280', hint: 'book cover', available: true },
  { title: 'Most Important Questions', exam: 'JEE MAIN 2026', image: 'https://picsum.photos/200/280', hint: 'book cover', available: false },
  { title: 'Rank Booster Questions', exam: 'JEE ADVANCED 2026', image: 'https://picsum.photos/200/280', hint: 'book cover', available: false },
  { title: 'Triumph MHT-CET', exam: 'Question Bank', image: 'https://picsum.photos/200/280', hint: 'book cover', available: false },
  { title: '2026 BITSAT Prep Guide', exam: 'PREP GUIDE', image: 'https://picsum.photos/200/280', hint: 'book cover', available: false },
  { title: '2026 WBJEE Chapterwise Explorer', exam: 'CHAPTERWISE EXPLORER', image: 'https://picsum.photos/200/280', hint: 'book cover', available: false },
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
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-4">
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

      <section className="space-y-4">
        <div className="flex justify-between items-center">
            <h2 className="text-2xl font-headline font-bold">
                Most Important Digital Books
            </h2>
            <Button variant="link" className="text-primary">VIEW ALL</Button>
        </div>
        <p className="text-muted-foreground">No need to buy bulky physical books. Get them all in one place!</p>
        <div className="relative">
            <Carousel opts={{ align: 'start', dragFree: true }}>
                <CarouselContent className="-ml-4">
                {digitalBooks.map((book, index) => (
                    <CarouselItem key={index} className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 pl-4">
                        <Card className="bg-secondary/30 border-0">
                            <CardContent className="p-0 aspect-[2/3] relative">
                                <Image src={book.image} alt={book.title} fill className="object-cover rounded-md" data-ai-hint={book.hint} />
                                {!book.available && (
                                    <div className="absolute bottom-0 w-full text-center bg-red-600 text-white text-xs font-bold py-1.5">
                                        COMING SOON
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                         <div className="mt-2 text-center">
                            <p className="font-semibold text-sm truncate">{book.title}</p>
                            <p className="text-xs text-muted-foreground">{book.exam}</p>
                        </div>
                    </CarouselItem>
                ))}
                </CarouselContent>
            </Carousel>
        </div>
      </section>

      <section className="space-y-4">
        <Card className="p-4 bg-gradient-to-r from-secondary/30 to-background border-amber-500/30">
            <div className="flex justify-between items-center">
                <div className="flex flex-col">
                    <h3 className="font-bold text-lg">Solve DPPs</h3>
                    <p className="text-sm text-muted-foreground">681+ aspirants solved DPP in 1 last hr! <Flame className="inline w-4 h-4 text-amber-500" /></p>
                </div>
                <div className="flex items-center gap-2">
                    <Badge variant="outline" className="border-amber-400 text-amber-400 bg-amber-900/50">PREMIUM</Badge>
                    <ChevronRight className="w-5 h-5" />
                </div>
            </div>
        </Card>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <Card className="p-4 bg-secondary/30 hover:bg-primary/10 hover:border-primary transition-all cursor-pointer">
                 <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/20 rounded-lg">
                           <BookCopy className="w-5 h-5 text-primary" />
                        </div>
                        <h3 className="font-bold text-lg">PYQ Mock Tests</h3>
                    </div>
                    <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="bg-red-500/20 text-red-400 border-red-500/30">NEW</Badge>
                        <ChevronRight className="w-5 h-5" />
                    </div>
                 </div>
             </Card>
             <Card className="p-4 bg-secondary/30 hover:bg-primary/10 hover:border-primary transition-all cursor-pointer">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                         <div className="p-2 bg-primary/20 rounded-lg">
                           <PencilRuler className="w-5 h-5 text-primary" />
                        </div>
                        <h3 className="font-bold text-lg">Create Your Own Test</h3>
                    </div>
                     <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="bg-blue-500/20 text-blue-400 border-blue-500/30">UPDATED</Badge>
                        <ChevronRight className="w-5 h-5" />
                    </div>
                </div>
             </Card>
         </div>
         <Button variant="link" className="w-full">
            Formula Cards <Badge variant="secondary" className="ml-2 bg-red-500/20 text-red-400 border-red-500/30">NEW</Badge>
         </Button>
      </section>

    </div>
  );
}

