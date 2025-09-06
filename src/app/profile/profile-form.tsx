
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Save } from "lucide-react";
import { useEffect } from "react";
import { useProfile } from "@/context/profile-context";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

const profileSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  bio: z.string().max(160, { message: "Bio cannot be longer than 160 characters." }).optional(),
  avatar: z.string().url({ message: "Please enter a valid URL." }).optional(),
  studyGoals: z.string().max(200, { message: "Study goals cannot be longer than 200 characters." }).optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const ProfileFormSkeleton = () => (
    <div className="space-y-8">
        <div className="space-y-4">
            <h3 className="text-lg font-medium font-headline"><Skeleton className="h-6 w-40" /></h3>
            <div className="space-y-4 p-4 border rounded-lg">
                 <div className="flex items-center gap-4">
                    <Skeleton className="h-20 w-20 rounded-full" />
                    <div className="w-full space-y-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                </div>
                <div className="space-y-2">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-10 w-full" />
                </div>
                <div className="space-y-2">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-10 w-full" />
                </div>
                 <div className="space-y-2">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-20 w-full" />
                </div>
                 <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-20 w-full" />
                </div>
            </div>
        </div>
        <Skeleton className="h-10 w-32" />
    </div>
)


export default function ProfileForm() {
  const { toast } = useToast();
  const { profile, setProfile, isLoading } = useProfile();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      email: "",
      bio: "",
      avatar: "",
      studyGoals: "",
    },
  });

  useEffect(() => {
    if (profile) {
      form.reset({
        name: profile.name,
        email: profile.email,
        bio: profile.bio || '',
        avatar: profile.avatar || '',
        studyGoals: profile.studyGoals || ''
      });
    }
  }, [profile, form]);

  function onSubmit(data: ProfileFormValues) {
    if(!profile) return;
    setProfile({ 
        name: data.name,
        email: data.email,
        bio: data.bio || '',
        avatar: data.avatar || '',
        studyGoals: data.studyGoals || ''
     });
    toast({
      title: "Profile Saved",
      description: "Your profile information has been successfully saved.",
    });
  }
  
  if (isLoading || !profile) {
    return <ProfileFormSkeleton />;
  }

  const avatarUrl = form.watch("avatar") || profile.avatar;
  const profileName = form.watch("name") || profile.name;

  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-4">
            <h3 className="text-lg font-medium font-headline">Personal Information</h3>
            <div className="space-y-4 p-4 border rounded-lg">
                <FormField
                  control={form.control}
                  name="avatar"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-4">
                        <Avatar className="h-20 w-20">
                            <AvatarImage src={avatarUrl} alt={profileName} data-ai-hint="student avatar" />
                            <AvatarFallback>{profileName.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div className="w-full space-y-1">
                            <FormLabel>Avatar URL</FormLabel>
                            <FormControl>
                                <Input placeholder="https://example.com/avatar.png" {...field} />
                            </FormControl>
                            <FormMessage />
                        </div>
                    </FormItem>
                  )}
                />
                <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                        <Input placeholder="Your Name" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                        <Input type="email" placeholder="your.email@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                 <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                        <FormLabel>Bio</FormLabel>
                        <FormControl>
                            <Textarea placeholder="Tell us a little bit about yourself" {...field} />
                        </FormControl>
                        <FormDescription>
                            A short and sweet bio to appear on your profile.
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="studyGoals"
                  render={({ field }) => (
                    <FormItem>
                        <FormLabel>Study Goals</FormLabel>
                        <FormControl>
                            <Textarea placeholder="What are you hoping to achieve?" {...field} />
                        </FormControl>
                         <FormDescription>
                            Write down your main study goals to stay focused.
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                  )}
                />
            </div>
        </div>

        <Button type="submit" variant="accent">
            <Save className="mr-2 h-4 w-4" />
            Save Changes
        </Button>
        </form>
    </Form>
  );
}
