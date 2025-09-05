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
import { Save } from "lucide-react";

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

export default function SettingsForm() {
  const { toast } = useToast();

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      name: "Student",
      email: "student@example.com",
      theme: "light",
      emailNotifications: true,
      pushNotifications: false,
    },
  });

  function onSubmit(data: SettingsFormValues) {
    console.log("Settings updated:", data);
    toast({
      title: "Settings Saved",
      description: "Your new settings have been successfully saved.",
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Profile Section */}
        <div className="space-y-4">
            <h3 className="text-lg font-medium font-headline">Profile</h3>
            <div className="space-y-4 p-4 border rounded-lg">
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
            </div>
        </div>

        <Separator />

        {/* Appearance Section */}
        <div className="space-y-4">
            <h3 className="text-lg font-medium font-headline">Appearance</h3>
             <div className="space-y-4 p-4 border rounded-lg">
                <FormField
                control={form.control}
                name="theme"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Theme</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                control={form.control}
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
                control={form.control}
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
  );
}
