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
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Save, Send } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect } from "react";
import { useProfile } from "@/context/profile-context";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle } from "lucide-react";

const settingsSchema = z.object({
  // Profile Settings
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),

  // Appearance Settings
  theme: z.enum(["light", "dark", "system"]),

  // Notification Settings
  emailNotifications: z.boolean(),
  pushNotifications: z.boolean(),
});

type SettingsFormValues = z.infer<typeof settingsSchema>;


const reportProblemSchema = z.object({
    subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
    description: z.string().min(20, { message: "Description must be at least 20 characters." }),
});

type ReportProblemFormValues = z.infer<typeof reportProblemSchema>;


export default function SettingsForm() {
  const { toast } = useToast();
  const { setTheme, theme } = useTheme();
  const { profile, setProfile } = useProfile();

  const settingsForm = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      name: "Student",
      email: "student@example.com",
      theme: "light",
      emailNotifications: true,
      pushNotifications: false,
    },
  });

  const reportProblemForm = useForm<ReportProblemFormValues>({
    resolver: zodResolver(reportProblemSchema),
    defaultValues: {
        subject: "",
        description: "",
    }
  });

  useEffect(() => {
    if (theme) {
      settingsForm.setValue("theme", theme as "light" | "dark" | "system");
    }
    settingsForm.setValue("name", profile.name);
    settingsForm.setValue("email", profile.email);
  }, [theme, profile, settingsForm]);


  function onSettingsSubmit(data: SettingsFormValues) {
    setTheme(data.theme);
    setProfile({ name: data.name, email: data.email });
    toast({
      title: "Settings Saved",
      description: "Your new settings have been successfully saved.",
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

  return (
    <div className="space-y-12">
        <Form {...settingsForm}>
            <form onSubmit={settingsForm.handleSubmit(onSettingsSubmit)} className="space-y-8">
            {/* Profile Section */}
            <div className="space-y-4">
                <h3 className="text-lg font-medium font-headline">Profile</h3>
                <div className="space-y-4 p-4 border rounded-lg">
                    <FormField
                    control={settingsForm.control}
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
                    control={settingsForm.control}
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
                </div>
            </div>

            <Separator />

            {/* Appearance Section */}
            <div className="space-y-4">
                <h3 className="text-lg font-medium font-headline">Appearance</h3>
                <div className="space-y-4 p-4 border rounded-lg">
                    <FormField
                    control={settingsForm.control}
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
                </div>
            </div>
            
            <Separator />

            {/* Notifications Section */}
            <div className="space-y-4">
                <h3 className="text-lg font-medium font-headline">Notifications</h3>
                <div className="space-y-4 p-4 border rounded-lg">
                    <FormField
                    control={settingsForm.control}
                    name="emailNotifications"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between">
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
                    control={settingsForm.control}
                    name="pushNotifications"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between">
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
            </div>

            <Button type="submit" variant="accent">
                <Save className="mr-2 h-4 w-4" />
                Save Changes
            </Button>
            </form>
        </Form>

        <Separator />
        
        {/* Report a Problem Section */}
        <Form {...reportProblemForm}>
            <form onSubmit={reportProblemForm.handleSubmit(onReportProblemSubmit)} className="space-y-8">
                <div className="space-y-4">
                    <h3 className="text-lg font-medium font-headline flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 text-destructive" />
                        Report a Problem
                    </h3>
                     <div className="space-y-4 p-4 border rounded-lg">
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
                                    <FormDescription>
                                        The more detail you can provide, the faster we can resolve the issue.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                 <Button type="submit" variant="destructive">
                    <Send className="mr-2 h-4 w-4" />
                    Submit Report
                </Button>
            </form>
        </Form>
    </div>
  );
}
