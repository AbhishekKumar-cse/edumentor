
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
  ChevronRight,
  Search,
  Mic,
  ListTree,
  FileQuestion,
  ImageIcon
} from 'lucide-react';
import { useProfile } from '@/context/profile-context';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChapterCard } from '@/components/ui/chapter-card';
import { Input } from '@/components/ui/input';
import { AlternatingCurrentIcon, CurrentElectricityIcon, OscillationsIcon, RotationalMotionIcon, SemiconductorsIcon } from '@/components/icons';
import { cn } from '@/lib/utils';
import Autoplay from "embla-carousel-autoplay";
import { useState } from 'react';
import { useRouter } from 'next/navigation';


const examCategories = [
  { name: 'JEE Main', logo: 'https://picsum.photos/seed/jee-main-logo/40/40', tag: '2025 QS ADDED', tagColor: 'bg-red-500/20 text-red-400 border-red-500/30', href: '/mock-test' },
  { name: 'JEE Advanced', logo: 'https://picsum.photos/seed/jee-advanced-logo/40/40', tag: '2025 QS ADDED', tagColor: 'bg-red-500/20 text-red-400 border-red-500/30', href: '/mock-test' },
  { name: 'Boards', logo: 'https://picsum.photos/seed/boards-logo/40/40', tag: 'New', tagColor: 'bg-pink-500/20 text-pink-400 border-pink-500/30', href: '/mock-test' },
  { name: 'NTA Abhyas (JEE Main)', logo: 'https://picsum.photos/seed/nta-logo/40/40', tag: 'COMING SOON', tagColor: 'bg-gray-500/20 text-gray-400 border-gray-500/30', href: '#' },
  { name: 'BITSAT', logo: 'https://picsum.photos/seed/bitsat-logo/40/40', tag: 'COMING SOON', tagColor: 'bg-gray-500/20 text-gray-400 border-gray-500/30', href: '#' },
  { name: 'NDA', logo: 'https://picsum.photos/seed/nda-logo/40/40', tag: 'COMING SOON', tagColor: 'bg-gray-500/20 text-gray-400 border-gray-500/30', href: '#' },
  { name: 'VITEEE', logo: 'https://picsum.photos/seed/viteee-logo/40/40', tag: 'COMING SOON', tagColor: 'bg-gray-500/20 text-gray-400 border-gray-500/30', href: '#' },
  { name: 'IAT (IISER)', logo: 'https://picsum.photos/seed/iiser-logo/40/40', tag: 'COMING SOON', tagColor: 'bg-gray-500/20 text-gray-400 border-gray-500/30', href: '#' },
  { name: 'CUET', logo: 'https://picsum.photos/seed/cuet-logo/40/40', tag: 'COMING SOON', tagColor: 'bg-gray-500/20 text-gray-400 border-gray-500/30', href: '#' },
];


const subjects = [
  { name: 'Physics', icon: <Atom className="w-5 h-5" /> },
  { name: 'Chemistry', icon: <FlaskConical className="w-5 h-5" /> },
  { name: 'Mathematics', icon: <Calculator className="w-5 h-5" /> },
];

const formulaChapters = {
  physics: [
    { title: 'Current Electricity', questionCount: 39, icon: <CurrentElectricityIcon />, color: 'bg-sky-500' },
    { title: 'Semiconductors', questionCount: 51, icon: <SemiconductorsIcon />, color: 'bg-green-500' },
    { title: 'Alternating Current', questionCount: 11, icon: <AlternatingCurrentIcon />, color: 'bg-red-500' },
    { title: 'Rotational Motion', questionCount: 33, icon: <RotationalMotionIcon />, color: 'bg-purple-500' },
    { title: 'Oscillations', questionCount: 33, icon: <OscillationsIcon />, color: 'bg-blue-600' },
  ],
  chemistry: [
    { title: 'Chemical Bonding', questionCount: 45, icon: <FlaskConical />, color: 'bg-yellow-500' },
    { title: 'Solutions', questionCount: 30, icon: <FlaskConical />, color: 'bg-orange-500' },
    { title: 'Electrochemistry', questionCount: 41, icon: <FlaskConical />, color: 'bg-teal-500' },
  ],
  mathematics: [
    { title: 'Calculus', questionCount: 60, icon: <Calculator />, color: 'bg-indigo-500' },
    { title: 'Algebra', questionCount: 55, icon: <Calculator />, color: 'bg-pink-500' },
    { title: 'Vectors', questionCount: 25, icon: <Calculator />, color: 'bg-rose-500' },
  ]
};

export default function HomePage() {
   const { profile, isLoading } = useProfile();
   const [searchQuery, setSearchQuery] = useState('');
   const router = useRouter();

   const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
     if (e.key === 'Enter' && searchQuery.trim()) {
       router.push(`/tagging?q=${encodeURIComponent(searchQuery.trim())}`);
     }
   };

  return (
    <div className="space-y-10 pb-12 px-6 md:px-10">
      {isLoading || !profile ? (
        <header className="space-y-4 pt-6 md:pt-10">
            <Skeleton className="h-12 w-72" />
            <Skeleton className="h-8 w-80" />
        </header>
      ) : (
         <header className="space-y-2 pt-6 md:pt-10">
            <h1 className="text-5xl font-headline font-bold">
              Hey, {profile.name}!
            </h1>
            <p className="text-xl text-muted-foreground">
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
          plugins={[
            Autoplay({
              delay: 3000,
            }),
          ]}
          className="w-full"
        >
          <CarouselContent>
            <CarouselItem>
              <Card className="border-0 overflow-hidden bg-blue-500">
                <CardContent className="p-0">
                  <div className="relative aspect-[2/1] md:aspect-[3/1] lg:aspect-[4/1]">
                    <Image
                      src="https://picsum.photos/1200/400"
                      alt="JEE Main Banner"
                      fill
                      className="object-cover"
                      data-ai-hint="IIT campus"
                    />
                     <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent p-8 md:p-12 flex flex-col justify-center items-start text-white">
                        <Badge className="mb-2 bg-blue-600 text-white border-0">JEE Main 2025</Badge>
                        <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter">
                            Crack the Main Exam
                        </h2>
                        <p className="mt-2 text-lg md:text-xl max-w-md">Practice with thousands of PYQs and Mock Tests.</p>
                     </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
             <CarouselItem>
              <Card className="border-0 overflow-hidden bg-red-500">
                <CardContent className="p-0">
                  <div className="relative aspect-[2/1] md:aspect-[3/1] lg:aspect-[4/1]">
                    <Image
                      src="https://picsum.photos/1200/401"
                      alt="JEE Advanced Banner"
                      fill
                      className="object-cover"
                      data-ai-hint="NIT campus"
                    />
                     <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent p-8 md:p-12 flex flex-col justify-center items-start text-white">
                        <Badge className="mb-2 bg-red-600 text-white border-0">JEE Advanced 2025</Badge>
                        <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter">
                            Aim for the Top Ranks
                        </h2>
                        <p className="mt-2 text-lg md:text-xl max-w-md">Master concepts with our advanced level question bank.</p>
                     </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
             <CarouselItem>
              <Card className="border-0 overflow-hidden bg-green-500">
                <CardContent className="p-0">
                  <div className="relative aspect-[2/1] md:aspect-[3/1] lg:aspect-[4/1]">
                    <Image
                      src="https://picsum.photos/1200/402"
                      alt="NEET Banner"
                      fill
                      className="object-cover"
                      data-ai-hint="AIIMS building"
                    />
                     <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent p-8 md:p-12 flex flex-col justify-center items-start text-white">
                        <Badge className="mb-2 bg-green-600 text-white border-0">NEET 2025</Badge>
                        <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter">
                            Secure Your Medical Seat
                        </h2>
                         <p className="mt-2 text-lg md:text-xl max-w-md">Comprehensive preparation for your medical entrance exam.</p>
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

      <section className="space-y-6">
        <div className="flex justify-between items-center">
            <h2 className="text-4xl font-headline font-bold">
            Chapter wise PYQ Bank
            </h2>
            <Button variant="link" className="text-primary text-lg">VIEW ALL</Button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4">
            {examCategories.map((exam, index) => (
                <ExamCard key={`${exam.name}-${index}`} {...exam} />
            ))}
        </div>
      </section>

       <section>
        <Card className="p-8 bg-secondary/30">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="flex-1 space-y-3">
              <h2 className="text-4xl font-headline font-bold">
                India's Best 99%iler's Question Bank
              </h2>
              <p className="text-xl text-muted-foreground">
                Practice the most relevant questions to get the best results in
                your exams.
              </p>
            </div>
            <div className="flex-shrink-0 flex flex-wrap gap-4">
              {subjects.map((subject) => (
                <Button key={subject.name} variant="outline" size="lg" className="text-lg">
                  {subject.icon}
                  <span>{subject.name}</span>
                </Button>
              ))}
            </div>
          </div>
        </Card>
      </section>

      <section className="space-y-6">
        <Card
          onClick={() => router.push('/dpp')}
          className="p-6 bg-gradient-to-r from-secondary/30 to-background border-amber-500/30 hover:shadow-lg hover:shadow-amber-500/20 transition-shadow duration-300 cursor-pointer">
            <div className="flex justify-between items-center">
                <div className="flex flex-col">
                    <h3 className="font-bold text-2xl">Solve DPPs</h3>
                    <p className="text-lg text-muted-foreground">many aspirants solved DPP in 1 last hr! <Flame className="inline w-5 h-5 text-amber-500" /></p>
                </div>
                <div className="flex items-center gap-2">
                    <Badge variant="outline" className="border-amber-400 text-amber-400 bg-amber-900/50 text-base">PREMIUM</Badge>
                    <ChevronRight className="w-6 h-6" />
                </div>
            </div>
        </Card>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <Card className="p-6 bg-secondary/30 hover:bg-primary/10 hover:border-primary transition-all cursor-pointer hover:shadow-lg hover:shadow-primary/20">
                 <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-primary/20 rounded-lg">
                           <BookCopy className="w-8 h-8 text-primary" />
                        </div>
                        <h3 className="font-bold text-2xl">PYQ Mock Tests</h3>
                    </div>
                    <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="bg-red-500/20 text-red-400 border-red-500/30 text-base">NEW</Badge>
                        <ChevronRight className="w-6 h-6" />
                    </div>
                 </div>
             </Card>
             <Card className="p-6 bg-secondary/30 hover:bg-primary/10 hover:border-primary transition-all cursor-pointer hover:shadow-lg hover:shadow-primary/20">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                         <div className="p-3 bg-primary/20 rounded-lg">
                           <PencilRuler className="w-8 h-8 text-primary" />
                        </div>
                        <h3 className="font-bold text-2xl">Create Your Own Test</h3>
                    </div>
                     <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-base">UPDATED</Badge>
                        <ChevronRight className="w-6 h-6" />
                    </div>
                </div>
             </Card>
         </div>
         <Button variant="link" className="w-full text-lg">
            Formula Cards <Badge variant="secondary" className="ml-2 bg-red-500/20 text-red-400 border-red-500/30 text-sm">NEW</Badge>
         </Button>
      </section>

      <section>
        <Card className="p-8 bg-secondary/30">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-4xl font-headline font-bold flex items-center gap-3">
              Formula Cards <Badge variant="destructive" className="text-base">NEW</Badge>
            </h2>
          </div>
          <Tabs defaultValue="physics">
            <TabsList>
              <TabsTrigger value="physics" className="gap-2 text-base"><Atom className="w-5 h-5" /> Physics</TabsTrigger>
              <TabsTrigger value="chemistry" className="gap-2 text-base"><FlaskConical className="w-5 h-5" /> Chemistry</TabsTrigger>
              <TabsTrigger value="mathematics" className="gap-2 text-base"><Calculator className="w-5 h-5" /> Mathematics</TabsTrigger>
            </TabsList>
            <div className="mt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-2xl">Recent chapters</h3>
                <Button variant="link" className="text-primary text-lg">VIEW ALL</Button>
              </div>
              <TabsContent value="physics">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                  {formulaChapters.physics.map((chapter) => <ChapterCard key={chapter.title} {...chapter} />)}
                </div>
              </TabsContent>
              <TabsContent value="chemistry">
                 <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                  {formulaChapters.chemistry.map((chapter) => <ChapterCard key={chapter.title} {...chapter} />)}
                </div>
              </TabsContent>
              <TabsContent value="mathematics">
                 <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                  {formulaChapters.mathematics.map((chapter) => <ChapterCard key={chapter.title} {...chapter} />)}
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </Card>
      </section>

      <section>
        <Card className="p-8 bg-secondary/30">
            <h2 className="text-4xl font-headline font-bold mb-4">
              Concept-wise Notes
            </h2>
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-6 h-6" />
                <Input 
                    placeholder="Get clarity on any topic" 
                    className="pl-12 pr-12 h-14 rounded-full bg-background text-lg" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleSearch}
                />
                <Mic className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground w-6 h-6" />
            </div>
        </Card>
      </section>

       <section>
        <Card className="p-8 bg-secondary/30">
            <div className="flex items-center gap-4 mb-6">
                <div>
                   <h2 className="text-4xl font-headline font-bold text-purple-400">NCERT</h2>
                   <h2 className="text-5xl font-headline font-bold">Toolbox</h2>
                </div>
                <p className="text-lg text-muted-foreground">For future Doctors and Engineers</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="p-6 bg-background/50 hover:bg-primary/10 hover:border-primary transition-all cursor-pointer hover:shadow-lg hover:shadow-primary/20">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-primary/20 rounded-lg">
                           <ListTree className="w-8 h-8 text-primary" />
                        </div>
                        <div className="flex flex-col">
                            <h3 className="font-bold text-2xl">NCERT Line by Line Qs</h3>
                        </div>
                    </div>
                </Card>
                <Card className="p-6 bg-background/50 hover:bg-primary/10 hover:border-primary transition-all cursor-pointer hover:shadow-lg hover:shadow-primary/20">
                    <div className="flex items-center gap-4">
                         <div className="p-3 bg-primary/20 rounded-lg">
                           <FileQuestion className="w-8 h-8 text-primary" />
                        </div>
                        <div className="flex flex-col">
                           <h3 className="font-bold text-2xl">NCERT & Exampler Qs</h3>
                        </div>
                    </div>
                </Card>
                 <Card className="p-6 bg-background/50 hover:bg-primary/10 hover:border-primary transition-all cursor-pointer hover:shadow-lg hover:shadow-primary/20">
                    <div className="flex items-center gap-4">
                         <div className="p-3 bg-primary/20 rounded-lg">
                           <ImageIcon className="w-8 h-8 text-primary" />
                        </div>
                        <div className="flex flex-col">
                           <h3 className="font-bold text-2xl">Diagram Based Qs</h3>
                        </div>
                    </div>
                </Card>
            </div>
        </Card>
      </section>

    </div>
  );
}
