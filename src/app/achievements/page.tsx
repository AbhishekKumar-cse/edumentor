
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Award, Medal, Zap, Calendar, Target, ShieldCheck, Moon, Sun, Trophy, BrainCircuit, CheckCircle2, Wind, Crown, Hash, Milestone, Atom, FlaskConical, Calculator, Sunrise, Activity, HelpCircle, CalendarCheck, FileQuestion, BookOpen, Clock, Bot, TrendingUp, Goal, BookCopy, Share2, Lightbulb, UserCheck, Star, Brain } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const achievements = [
  {
    icon: <Zap className="w-8 h-8 text-yellow-400" />,
    title: "Study Streak: 7 Days",
    description: "You've studied consistently for a whole week!",
    unlocked: true,
  },
  {
    icon: <Calendar className="w-8 h-8 text-blue-400" />,
    title: "Monthly Marathon",
    description: "Completed a full month of dedicated study.",
    unlocked: true,
  },
  {
    icon: <Target className="w-8 h-8 text-green-400" />,
    title: "100 Questions Solver",
    description: "You've successfully solved 100 questions.",
    unlocked: true,
  },
  {
    icon: <Medal className="w-8 h-8 text-orange-400" />,
    title: "Chapter Master",
    description: "Mastered a full chapter by completing all its questions.",
    unlocked: false,
  },
  {
    icon: <Award className="w-8 h-8 text-purple-400" />,
    title: "Focus Champion",
    description: "Completed a 4-hour continuous study session.",
    unlocked: true,
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-red-400" />,
    title: "Test Topper",
    description: "Achieved the highest score in a mock test.",
    unlocked: false,
  },
   {
    icon: <Moon className="w-8 h-8 text-indigo-400" />,
    title: "Night Owl",
    description: "Studied past midnight for 3 consecutive days.",
    unlocked: true,
  },
  {
    icon: <Sun className="w-8 h-8 text-pink-400" />,
    title: "Weekend Warrior",
    description: "Solved over 50 questions during a weekend.",
    unlocked: false,
  },
  {
    icon: <BrainCircuit className="w-8 h-8 text-cyan-400" />,
    title: "Quiz Whiz",
    description: "Ace 5 quizzes in a row.",
    unlocked: true,
  },
  {
    icon: <CheckCircle2 className="w-8 h-8 text-green-500" />,
    title: "Perfect Score",
    description: "Get 100% on a mock test.",
    unlocked: false,
  },
  {
    icon: <Wind className="w-8 h-8 text-teal-400" />,
    title: "Speed Demon",
    description: "Complete a test in half the allotted time.",
    unlocked: false,
  },
  {
    icon: <Crown className="w-8 h-8 text-amber-400" />,
    title: "Consistency King",
    description: "Maintain a study streak for 30 consecutive days.",
    unlocked: false,
  },
  {
    icon: <Hash className="w-8 h-8 text-gray-400" />,
    title: "500 Questions Club",
    description: "Successfully solve 500 questions.",
    unlocked: false,
  },
  {
    icon: <Milestone className="w-8 h-8 text-lime-500" />,
    title: "1000 Questions Club",
    description: "A grand achievement of solving 1000 questions.",
    unlocked: false,
  },
  {
    icon: <Atom className="w-8 h-8 text-blue-500" />,
    title: "Physics Specialist",
    description: "Master 5 chapters in Physics.",
    unlocked: true,
  },
  {
    icon: <FlaskConical className="w-8 h-8 text-green-600" />,
    title: "Chemistry Specialist",
    description: "Master 5 chapters in Chemistry.",
    unlocked: false,
  },
  {
    icon: <Calculator className="w-8 h-8 text-red-500" />,
    title: "Maths Specialist",
    description: "Master 5 chapters in Mathematics.",
    unlocked: false,
  },
  {
    icon: <Sunrise className="w-8 h-8 text-orange-500" />,
    title: "Early Bird",
    description: "Study before 6 AM for 5 days in a row.",
    unlocked: true,
  },
  {
    icon: <Activity className="w-8 h-8 text-rose-500" />,
    title: "Marathon Runner",
    description: "Complete a study session longer than 6 hours.",
    unlocked: false,
  },
  {
    icon: <HelpCircle className="w-8 h-8 text-sky-500" />,
    title: "Doubt Destroyer",
    description: "Get 20 doubts solved using the AI Doubt Solver.",
    unlocked: true,
  },
  {
    icon: <CalendarCheck className="w-8 h-8 text-fuchsia-500" />,
    title: "Planner Pro",
    description: "Generate and follow a revision plan for a week.",
    unlocked: false,
  },
  {
    icon: <FileQuestion className="w-8 h-8 text-violet-500" />,
    title: "Question Explorer",
    description: "Explore 10 different chapters in the question bank.",
    unlocked: true,
  },
  {
    icon: <BookOpen className="w-8 h-8 text-emerald-500" />,
    title: "Resourceful Learner",
    description: "View 5 different concept maps from the resources page.",
    unlocked: false,
  },
  {
    icon: <Clock className="w-8 h-8 text-cyan-600" />,
    title: "Time Master",
    description: "Spend over 24 hours studying in total.",
    unlocked: true,
  },
  {
    icon: <Bot className="w-8 h-8 text-indigo-600" />,
    title: "AI Collaborator",
    description: "Use the AI Tagger for 10 different questions.",
    unlocked: false,
  },
  {
    icon: <TrendingUp className="w-8 h-8 text-lime-600" />,
    title: "Steady Improver",
    description: "Improve your mock test score by 20% or more.",
    unlocked: false,
  },
  {
    icon: <Goal className="w-8 h-8 text-amber-600" />,
    title: "Goal Setter",
    description: "Set and complete your study goals in your profile.",
    unlocked: true,
  },
  {
    icon: <BookCopy className="w-8 h-8 text-red-600" />,
    title: "Formula Fanatic",
    description: "Review all the formulas for a single subject.",
    unlocked: false,
  },
  {
    icon: <Star className="w-8 h-8 text-yellow-500" />,
    title: "Top Reviewer",
    description: "Provide a 5-star rating in the settings.",
    unlocked: true,
  },
  {
    icon: <Brain className="w-8 h-8 text-pink-600" />,
    title: "Topic Pro",
    description: "Explore 5 different hot topics in the Topic Explorer.",
    unlocked: false,
  },
];

export default function AchievementsPage() {
  return (
    <div className="p-6 md:p-10">
      <div className="space-y-8">
        <header className="space-y-2">
          <h1 className="text-4xl font-headline font-bold">Your Achievements</h1>
          <p className="text-muted-foreground">
            Track your progress and celebrate your milestones. You've unlocked {achievements.filter(a => a.unlocked).length} out of {achievements.length} badges!
          </p>
        </header>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Trophy className="w-6 h-6 text-primary" />
              <span className="font-headline text-2xl">Badges Unlocked</span>
            </CardTitle>
            <CardDescription>
              Here are the badges you've earned for your hard work and dedication.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {achievements.map((achievement, index) => (
                    <Card 
                        key={index}
                        className={cn(
                            "p-6 flex flex-col items-center text-center gap-4 transition-all duration-300 ease-in-out",
                            achievement.unlocked 
                                ? "bg-secondary/50 border-primary/20 hover:scale-105 hover:shadow-lg hover:shadow-primary/20" 
                                : "bg-secondary/20 opacity-60 hover:opacity-80"
                        )}
                    >
                        <div className={cn(
                            "w-20 h-20 rounded-full flex items-center justify-center bg-gradient-to-br transition-all",
                            achievement.unlocked ? "from-yellow-400/20 to-primary/20" : "from-muted/20 to-muted/30"
                        )}>
                            {achievement.icon}
                        </div>
                        <div className="space-y-1">
                            <h3 className="text-lg font-bold font-headline">{achievement.title}</h3>
                            <p className="text-sm text-muted-foreground">{achievement.description}</p>
                        </div>
                         <Badge variant={achievement.unlocked ? "default" : "outline"} className={cn("transition-colors", achievement.unlocked ? "bg-green-500/80 border-green-500" : "")}>
                            {achievement.unlocked ? "Unlocked" : "Locked"}
                        </Badge>
                    </Card>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
