
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Settings } from "lucide-react";
import SettingsForm from "./settings-form";

export default function SettingsPage() {
  return (
    <div className="p-6 md:p-10">
      <div className="space-y-8">
        <header className="space-y-2">
          <h1 className="text-4xl font-headline font-bold">Settings</h1>
          <p className="text-muted-foreground">
            Manage your application settings and provide feedback.
          </p>
        </header>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Settings className="w-6 h-6 text-primary" />
              <span className="font-headline text-2xl">Configuration</span>
            </CardTitle>
            <CardDescription>
              Adjust appearance, notifications, and other application preferences.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SettingsForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
