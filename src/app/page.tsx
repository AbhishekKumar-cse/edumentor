
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
  Search,
  Mic,
  BookText,
  FileQuestion,
  GalleryVertical,
  ArrowRight,
  ClipboardList,
  FilePlus2,
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChapterCard } from '@/components/ui/chapter-card';
import {
  CurrentElectricityIcon,
  SemiconductorsIcon,
  AlternatingCurrentIcon,
  RotationalMotionIcon,
  OscillationsIcon,
  FlameIcon,
} from '@/components/icons';
import Link from 'next/link';

const examCategories = [
  {
    name: 'JEE Main',
    logo: '/jee-main-logo.png',
    tags: ['PYQs', 'Mock Tests', 'Chapter Wise'],
    href: '/mock-test',
  },
  {
    name: 'JEE Advanced',
    logo: '/jee-advanced-logo.png',
    tags: ['PYQs', 'Mock Tests', 'Chapter Wise'],
    href: '/mock-test',
  },
  {
    name: 'NEET',
    logo: '/neet-logo.png',
    tags: ['PYQs', 'Mock Tests', 'Chapter Wise'],
    href: '/mock-test',
  },
  {
    name: 'CUET',
    logo: '/cuet-logo.png',
    tags: ['PYQs', 'Mock Tests', 'Chapter Wise'],
    href: '/mock-test',
  },
];

const subjects = [
  { name: 'Physics', icon: <Atom className="w-5 h-5" /> },
  { name: 'Chemistry', icon: <FlaskConical className="w-5 h-5" /> },
  { name: 'Mathematics', icon: <Calculator className="w-5 h-5" /> },
];

const digitalBooks = [
    {
        title: 'Backlog से Azadi',
        exam: 'JEE MAIN 2026',
        image: 'https://picsum.photos/200/280',
        aiHint: 'book cover'
    },
    {
        title: 'Most Important Questions',
        exam: 'JEE MAIN 2026',
        image: 'https://picsum.photos/200/280',
        aiHint: 'book cover'
    },
    {
        title: 'Rank Booster Questions',
        exam: 'JEE ADVANCED 2026',
        image: 'https://picsum.photos/200/280',
        aiHint: 'book cover'
    },
    {
        title: 'TRIUMPH MHT-CET Question Bank',
        exam: '2026',
        image: 'https://picsum.photos/200/280',
        aiHint: 'book cover'
    },
    {
        title: '2026 BITSAT PREP GUIDE',
        exam: '',
        image: 'https://picsum.photos/200/280',
        aiHint: 'book cover'
    },
    {
        title: '2026 WBJEE CHAPTERWISE EXPLORER',
        exam: '',
        image: 'https://picsum.photos/200/280',
        aiHint: 'book cover'
    },
]

export default function HomePage() {
  return (
    <div className="space-y-8 pb-12">
      <header className="space-y-2">
        <h1 className="text-4xl font-headline font-bold">
          Welcome back, Student!
        </h1>
        <p className="text-muted-foreground">
          Let's practice and conquer your exams.
        </p>
      </header>

      <section>
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
        >
          <CarouselContent>
            <CarouselItem>
              <Card className="border-0 overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative aspect-[2/1] md:aspect-[3/1] lg:aspect-[4/1]">
                    <Image
                      src="https://picsum.photos/1200/400"
                      alt="Find your weak chapters"
                      fill
                      className="object-cover"
                      data-ai-hint="promotional banner"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent p-8 md:p-12 flex flex-col justify-center">
                      <h2 className="text-3xl md:text-4xl font-headline font-bold text-white max-w-md">
                        Find your weak chapters and get guaranteed improvement
                      </h2>
                      <Badge className="mt-4 w-fit" variant="destructive">
                        Practice Now
                      </Badge>
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
        <h2 className="text-2xl font-headline font-bold">
          Chapter wise PYQ Bank
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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

      {/* New Section from Image */}
      <section className="space-y-8 pt-8">
        <Card className="p-6 bg-slate-800/50 border-slate-700">
          <div className="flex items-center justify-between gap-4 mb-6">
            <h2 className="text-2xl font-headline font-bold text-white">
              Most Important Digital Books
            </h2>
             <Button variant="link" className="text-blue-400">
                VIEW ALL
            </Button>
          </div>
           <p className="text-muted-foreground mb-6 -mt-4">
              No need to buy bulky physical books. Get them all in one place!
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {digitalBooks.map((book, index) => (
                    <div key={index} className="space-y-2">
                        <div className="aspect-[5/7] bg-secondary rounded-lg overflow-hidden">
                           <Image src={book.image} alt={book.title} width={200} height={280} className="w-full h-full object-cover" data-ai-hint={book.aiHint}/>
                        </div>
                        <div className="bg-red-600 text-center py-1 rounded-sm">
                            <p className="text-xs font-bold text-white">COMING SOON</p>
                        </div>
                    </div>
                ))}
            </div>
        </Card>

        <Card className="p-4 bg-slate-800/50 border-orange-400/50 hover:bg-slate-800 transition-colors cursor-pointer">
            <Link href="#" className="flex items-center justify-between gap-4">
                <div>
                    <h3 className="text-lg font-bold text-white">Solve DPPs</h3>
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                        681+ aspirants solved DPP in 1 last hr! <FlameIcon className="text-orange-400"/>
                    </p>
                </div>
                <div className="flex items-center gap-4">
                     <Badge className="bg-orange-200 text-orange-900 hover:bg-orange-300">
                        <Image src="https://picsum.photos/20/20" alt="Premium" width={16} height={16} className="mr-1.5" data-ai-hint="crown icon"/>
                        PREMIUM
                    </Badge>
                    <ArrowRight className="text-muted-foreground"/>
                </div>
            </Link>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-4 bg-slate-800/50 border-purple-400/50 hover:bg-slate-800 transition-colors cursor-pointer">
                <Link href="/mock-test" className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <ClipboardList className="text-purple-400"/>
                        <p className="font-bold text-white">PYQ Mock Tests</p>
                    </div>
                     <div className="flex items-center gap-4">
                        <Badge variant="destructive">NEW</Badge>
                        <ArrowRight className="text-muted-foreground"/>
                    </div>
                </Link>
            </Card>
             <Card className="p-4 bg-slate-800/50 border-cyan-400/50 hover:bg-slate-800 transition-colors cursor-pointer">
                <Link href="/mock-test" className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <FilePlus2 className="text-cyan-400"/>
                        <p className="font-bold text-white">Create Your Own Test</p>
                    </div>
                     <div className="flex items-center gap-4">
                        <Badge className="bg-cyan-500 text-white border-cyan-500">UPDATED</Badge>
                        <ArrowRight className="text-muted-foreground"/>
                    </div>
                </Link>
            </Card>
        </div>


        <Card className="p-6 bg-slate-800/50 border-slate-700">
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-2xl font-headline font-bold text-white">
              Formula Cards
            </h2>
            <Badge variant="destructive">NEW</Badge>
          </div>
          <Tabs defaultValue="physics">
            <TabsList className="bg-slate-700/50 text-white">
              <TabsTrigger value="physics" className="flex items-center gap-2">
                <Atom className="w-4 h-4" /> Physics
              </TabsTrigger>
              <TabsTrigger
                value="chemistry"
                className="flex items-center gap-2"
              >
                <FlaskConical className="w-4 h-4" /> Chemistry
              </TabsTrigger>
              <TabsTrigger
                value="mathematics"
                className="flex items-center gap-2"
              >
                <Calculator className="w-4 h-4" /> Mathematics
              </TabsTrigger>
            </TabsList>
            <TabsContent value="physics" className="mt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-white">
                  Recent chapters
                </h3>
                <Button variant="link" className="text-blue-400">
                  VIEW ALL
                </Button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                <ChapterCard
                  title="Current Electricity"
                  questionCount={39}
                  icon={<CurrentElectricityIcon />}
                  color="bg-blue-500"
                />
                <ChapterCard
                  title="Semiconductors"
                  questionCount={51}
                  icon={<SemiconductorsIcon />}
                  color="bg-green-500"
                />
                <ChapterCard
                  title="Alternating Current"
                  questionCount={11}
                  icon={<AlternatingCurrentIcon />}
                  color="bg-red-500"
                />
                <ChapterCard
                  title="Rotational Motion"
                  questionCount={33}
                  icon={<RotationalMotionIcon />}
                  color="bg-purple-500"
                />
                <ChapterCard
                  title="Oscillations"
                  questionCount={33}
                  icon={<OscillationsIcon />}
                  color="bg-sky-500"
                />
              </div>
            </TabsContent>
          </Tabs>
        </Card>

        <Card className="p-6 bg-slate-800/50 border-slate-700">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <h2 className="text-2xl font-headline font-bold text-white">
              Concept-wise Notes
            </h2>
            <div className="w-full md:w-auto flex-1 md:max-w-sm bg-slate-700/50 rounded-lg flex items-center px-4 text-muted-foreground">
              <Search className="h-5 w-5 mr-3" />
              <input
                type="text"
                placeholder="Get clarity on any topic"
                className="bg-transparent w-full focus:outline-none py-3"
              />
              <Mic className="h-5 w-5 ml-3 cursor-pointer" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-slate-800/50 border-slate-700">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div>
              <h2 className="text-3xl font-headline font-bold text-white">
                NCERT <span className="text-purple-400">Toolbox</span>
              </h2>
              <p className="text-muted-foreground mt-1">
                For future Doctors and Engineers
              </p>
            </div>
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-slate-700/50 p-4 rounded-lg flex items-center gap-4 cursor-pointer hover:bg-slate-700 transition-colors">
                <div className="bg-slate-600 p-3 rounded-md">
                  <BookText className="h-6 w-6 text-purple-400" />
                </div>
                <p className="font-semibold text-white">NCERT Line by Line Qs</p>
              </div>
              <div className="bg-slate-700/50 p-4 rounded-lg flex items-center gap-4 cursor-pointer hover:bg-slate-700 transition-colors">
                <div className="bg-slate-600 p-3 rounded-md">
                  <FileQuestion className="h-6 w-6 text-purple-400" />
                </div>
                <p className="font-semibold text-white">NCERT & Exampler Qs</p>
              </div>
              <div className="bg-slate-700/50 p-4 rounded-lg flex items-center gap-4 cursor-pointer hover:bg-slate-700 transition-colors">
                <div className="bg-slate-600 p-3 rounded-md">
                  <GalleryVertical className="h-6 w-6 text-purple-400" />
                </div>
                <p className="font-semibold text-white">Diagram Based Qs</p>
              </div>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
