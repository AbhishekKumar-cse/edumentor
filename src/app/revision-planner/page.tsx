
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import PlannerForm from "./planner-form";

export default function RevisionPlannerPage() {
  return (
    <div className="p-6 md:p-10">
      <div className="space-y-8">
        <header className="space-y-2">
          <h1 className="text-4xl font-headline font-bold">Personalized Revision Planner</h1>
          <p className="text-muted-foreground">
            Let AI create a spaced-repetition revision schedule for you.
          </p>
        </header>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Calendar className="w-6 h-6 text-primary" />
              <span className="font-headline text-2xl">Create Your Schedule</span>
            </CardTitle>
            <CardDescription>
              Provide your performance data, exam date, and preferred frequency.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PlannerForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
