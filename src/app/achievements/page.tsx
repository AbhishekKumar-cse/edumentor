
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Award, Medal, Zap, Calendar, Target, ShieldCheck, Moon, Sun, Trophy } from "lucide-react";
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
];

export default function AchievementsPage() {
  return (
    <div className="p-6 md:p-10">
      <div className="space-y-8">
        <header className="space-y-2">
          <h1 className="text-4xl font-headline font-bold">Your Achievements</h1>
          <p className="text-muted-foreground">
            Track your progress and celebrate your milestones.
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
