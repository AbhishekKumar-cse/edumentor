
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
import { Save, Send, Share2, Star } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const settingsSchema = z.object({
  theme: z.enum(["light", "dark", "system"]),
  emailNotifications: z.boolean(),
  pushNotifications: z.boolean(),
  review: z.string().optional(),
  rating: z.number().min(0).max(5).optional(),
});

type SettingsFormValues = z.infer<typeof settingsSchema>;

export default function SettingsForm() {
  const { toast } = useToast();
  const { setTheme, theme } = useTheme();
  const [hoverRating, setHoverRating] = useState(0);

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      theme: "system",
      emailNotifications: true,
      pushNotifications: false,
      review: "",
      rating: 0,
    },
  });

  useEffect(() => {
    if (theme) {
      form.setValue("theme", theme as "light" | "dark" | "system");
    }
  }, [theme, form]);

  function onSubmit(data: SettingsFormValues) {
    setTheme(data.theme);
    console.log("Settings submitted:", data);
    toast({
      title: "Settings Saved",
      description: "Your new preferences have been saved.",
    });
  }

  function handleShare() {
    navigator.clipboard.writeText(window.location.origin);
    toast({
      title: "Link Copied!",
      description: "The application link has been copied to your clipboard.",
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-4">
          <h3 className="text-lg font-medium font-headline">Appearance</h3>
          <div className="space-y-4 p-4 border rounded-lg">
            <FormField
              control={form.control}
              name="theme"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Theme</FormLabel>
                  <Select 
                    onValueChange={(value) => {
                        field.onChange(value);
                        setTheme(value);
                    }} 
                    value={field.value}
                  >
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

        <div className="space-y-4">
          <h3 className="text-lg font-medium font-headline">Notifications</h3>
          <div className="space-y-4 rounded-lg border p-4">
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

        <div className="space-y-4">
          <h3 className="text-lg font-medium font-headline">Feedback & Support</h3>
           <div className="space-y-4 p-4 border rounded-lg">
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rate Your Experience</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={cn(
                            "w-8 h-8 cursor-pointer transition-colors",
                            (hoverRating || field.value) >= star ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground/50"
                          )}
                          onClick={() => form.setValue("rating", star)}
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
              control={form.control}
              name="review"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Share your feedback</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Tell us what you love or what we can improve..." rows={5} {...field} />
                  </FormControl>
                   <FormDescription>
                        Your feedback helps us make EduMentor AI better for everyone.
                    </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
            <Button type="submit" variant="accent">
                <Save className="mr-2 h-4 w-4" />
                Save Changes
            </Button>
             <Button type="button" variant="outline" onClick={handleShare}>
                <Share2 className="mr-2 h-4 w-4" />
                Share App
            </Button>
        </div>
      </form>
    </Form>
  );
}
