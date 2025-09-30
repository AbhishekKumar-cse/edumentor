
import PlannerForm from "./planner-form";

export default function RevisionPlannerPage() {
  return (
    <div className="relative min-h-full w-full p-4 md:p-6 bg-gray-900/50">
        <div className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4 w-[100rem] h-[100rem] rounded-full bg-gradient-cyan-purple-pink-extra-fast opacity-20 blur-3xl animate-rotate" />
      <div className="relative z-10 space-y-8 max-w-7xl mx-auto">
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
