import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { User } from "lucide-react";
import ProfileForm from "./profile-form";

export default function ProfilePage() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-4xl font-headline font-bold">Profile</h1>
        <p className="text-muted-foreground">
          Manage your personal information and study goals.
        </p>
      </header>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <User className="w-6 h-6 text-primary" />
            <span className="font-headline text-2xl">Your Profile</span>
          </CardTitle>
          <CardDescription>
            Update your name, email, bio, and study preferences.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProfileForm />
        </CardContent>
      </Card>
    </div>
  );
}
