
import PlannerForm from "./planner-form";

export default function RevisionPlannerPage() {
  return (
    <div className="h-full w-full p-4 md:p-6 bg-background/80">
       <div className="absolute top-0 left-0 -z-10 h-full w-full bg-background">
        <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(173,109,244,0.5)] opacity-50 blur-[80px]"></div>
      </div>
      <div className="space-y-8 max-w-7xl mx-auto">
        <header className="space-y-2 text-center">
          <h1 className="text-4xl font-headline font-bold">Personalized Revision Planner</h1>
          <p className="text-muted-foreground md:text-xl">
            Let AI create a spaced-repetition revision schedule based on your performance.
          </p>
        </header>
        <PlannerForm />
      </div>
    </div>
  );
}
