
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
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Save, Send, Share2, Star, Palette, Bell, MessageSquare, AlertCircle } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const appearanceSchema = z.object({
  theme: z.enum(["light", "dark", "system"]),
});
type AppearanceFormValues = z.infer<typeof appearanceSchema>;

const notificationsSchema = z.object({
  emailNotifications: z.boolean(),
  pushNotifications: z.boolean(),
});
type NotificationsFormValues = z.infer<typeof notificationsSchema>;


const reportProblemSchema = z.object({
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  description: z.string().min(20, { message: "Description must be at least 20 characters." }),
});

type ReportProblemFormValues = z.infer<typeof reportProblemSchema>;

const reviewSchema = z.object({
  review: z.string().min(10, { message: "Review must be at least 10 characters." }),
  rating: z.number().min(1, { message: "Please provide a rating." }),
});

type ReviewFormValues = z.infer<typeof reviewSchema>;

export default function SettingsForm() {
  const { toast } = useToast();
  const { setTheme, theme } = useTheme();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const appearanceForm = useForm<AppearanceFormValues>({
    resolver: zodResolver(appearanceSchema),
    defaultValues: {
      theme: "system",
    },
  });

  const notificationsForm = useForm<NotificationsFormValues>({
    resolver: zodResolver(notificationsSchema),
    defaultValues: {
      emailNotifications: true,
      pushNotifications: false,
    },
  });

  const reportProblemForm = useForm<ReportProblemFormValues>({
    resolver: zodResolver(reportProblemSchema),
    defaultValues: { subject: "", description: "" },
  });

  const reviewForm = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: { review: "", rating: 0 },
  });

  useEffect(() => {
    if (theme) {
      appearanceForm.setValue("theme", theme as "light" | "dark" | "system");
    }
  }, [theme, appearanceForm]);

  useEffect(() => {
    reviewForm.setValue("rating", rating);
  }, [rating, reviewForm]);

  function onAppearanceSubmit(data: AppearanceFormValues) {
    setTheme(data.theme);
    toast({
      title: "Appearance Settings Saved",
      description: "Your new theme settings have been saved.",
    });
  }

  function onNotificationsSubmit(data: NotificationsFormValues) {
    console.log("Notification settings submitted:", data);
    toast({
      title: "Notification Settings Saved",
      description: "Your notification preferences have been updated.",
    });
  }


  function onReportProblemSubmit(data: ReportProblemFormValues) {
    console.log("Problem Report:", data);
    toast({
      title: "Report Sent",
      description: "Thank you for your feedback. We will look into the issue.",
    });
    reportProblemForm.reset();
  }

  function onReviewSubmit(data: ReviewFormValues) {
    console.log("Review Submitted:", data);
    toast({
      title: "Review Submitted",
      description: "Thank you for your valuable feedback!",
    });
    reviewForm.reset();
    setRating(0);
  }

  function handleShare() {
    navigator.clipboard.writeText(window.location.origin);
    toast({
      title: "Link Copied!",
      description: "The application link has been copied to your clipboard.",
    });
  }

  return (
    <Tabs defaultValue="appearance" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="appearance"><Palette className="mr-2 h-4 w-4" />Appearance</TabsTrigger>
        <TabsTrigger value="notifications"><Bell className="mr-2 h-4 w-4" />Notifications</TabsTrigger>
        <TabsTrigger value="feedback"><MessageSquare className="mr-2 h-4 w-4" />Feedback & Support</TabsTrigger>
      </TabsList>
      
      <TabsContent value="appearance">
        <Card>
            <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>Customize the look and feel of the application.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...appearanceForm}>
                    <form onSubmit={appearanceForm.handleSubmit(onAppearanceSubmit)} className="space-y-8">
                        <FormField
                            control={appearanceForm.control}
                            name="theme"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Theme</FormLabel>
                                <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                    <SelectValue placeholder="Select a theme" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="light">Light</SelectItem>
                                    <SelectItem value="dark">Dark</SelectItem>
                                    <SelectItem value="system">System</SelectItem>
                                </SelectContent>
                                </Select>
                                <FormDescription>
                                Select the theme for the dashboard.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <Button type="submit" variant="accent"><Save className="mr-2 h-4 w-4" />Save Changes</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="notifications">
        <Card>
            <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>Manage how you receive notifications from us.</CardDescription>
            </CardHeader>
            <CardContent>
                 <Form {...notificationsForm}>
                    <form onSubmit={notificationsForm.handleSubmit(onNotificationsSubmit)} className="space-y-8">
                        <div className="space-y-4 rounded-lg">
                            <FormField
                                control={notificationsForm.control}
                                name="emailNotifications"
                                render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                    <div className="space-y-0.5">
                                    <FormLabel>Email notifications</FormLabel>
                                    <FormDescription>
                                        Receive emails about your account activity.
                                    </FormDescription>
                                    </div>
                                    <FormControl>
                                    <Switch
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                    </FormControl>
                                </FormItem>
                                )}
                            />
                            <FormField
                                control={notificationsForm.control}
                                name="pushNotifications"
                                render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                    <div className="space-y-0.5">
                                    <FormLabel>Push notifications</FormLabel>
                                    <FormDescription>
                                        Receive push notifications on your devices.
                                    </FormDescription>
                                    </div>
                                    <FormControl>
                                    <Switch
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                        disabled
                                        aria-readonly
                                    />
                                    </FormControl>
                                </FormItem>
                                )}
                            />
                        </div>
                        <Button type="submit" variant="accent"><Save className="mr-2 h-4 w-4" />Save Changes</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="feedback">
        <div className="grid gap-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Star className="w-5 h-5 text-yellow-500" />Review and Suggestion</CardTitle>
                    <CardDescription>Your feedback helps us make EduMentor AI better for everyone.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...reviewForm}>
                        <form onSubmit={reviewForm.handleSubmit(onReviewSubmit)} className="space-y-6">
                            <FormField
                                control={reviewForm.control}
                                name="rating"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Your Rating</FormLabel>
                                    <FormControl>
                                    <div className="flex items-center gap-1">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                        <Star
                                            key={star}
                                            className={cn(
                                            "w-8 h-8 cursor-pointer transition-colors",
                                            (hoverRating || rating) >= star ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground/50"
                                            )}
                                            onClick={() => setRating(star)}
                                            onMouseEnter={() => setHoverRating(star)}
                                            onMouseLeave={() => setHoverRating(0)}
                                        />
                                        ))}
                                    </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            <FormField
                                control={reviewForm.control}
                                name="review"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Your Feedback</FormLabel>
                                    <FormControl>
                                    <Textarea placeholder="Tell us what you love or what we can improve..." rows={5} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                             <Button type="submit" variant="default"><Send className="mr-2 h-4 w-4" />Submit Feedback</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
            
            <Card>
                <CardHeader>
                     <CardTitle className="flex items-center gap-2"><AlertCircle className="w-5 h-5 text-destructive" />Report a Problem</CardTitle>
                    <CardDescription>The more detail you can provide, the faster we can resolve the issue.</CardDescription>
                </CardHeader>
                <CardContent>
                     <Form {...reportProblemForm}>
                        <form onSubmit={reportProblemForm.handleSubmit(onReportProblemSubmit)} className="space-y-6">
                             <FormField
                                control={reportProblemForm.control}
                                name="subject"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Subject</FormLabel>
                                    <FormControl>
                                    <Input placeholder="e.g., 'Page not loading'" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            <FormField
                                control={reportProblemForm.control}
                                name="description"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                    <Textarea placeholder="Please describe the issue in detail..." rows={5} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                             <Button type="submit" variant="destructive"><Send className="mr-2 h-4 w-4" />Submit Report</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Share2 className="w-5 h-5 text-primary" />Share the App</CardTitle>
                    <CardDescription>Enjoying EduMentor AI? Share it with your friends!</CardDescription>
                </CardHeader>
                <CardContent>
                     <Button onClick={handleShare} variant="outline">
                        <Share2 className="mr-2 h-4 w-4" />
                        Copy Link
                    </Button>
                </CardContent>
            </Card>
        </div>
      </TabsContent>
    </Tabs>
  );
}
