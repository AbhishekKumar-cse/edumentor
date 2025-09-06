"use client";

import { useState } from "react";
import { resolveStudentDoubts } from "@/ai/flows/resolve-student-doubts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, User, Bot, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Message = {
  id: string;
  role: "user" | "assistant" | "model";
  content: string;
};

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      // The history needs to be in the format the model expects.
      const history = newMessages.slice(0, -1).map(msg => ({
          role: msg.role === 'assistant' ? 'model' : 'user',
          content: msg.content,
      }));

      const result = await resolveStudentDoubts({ 
        question: input,
        history,
       });

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: result.answer + (result.explanation ? `\n\n**Explanation:**\n${result.explanation}` : ''),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error(error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full max-h-[70vh]">
      <ScrollArea className="flex-1 p-6">
        <div className="space-y-6">
          {messages.length === 0 && (
            <div className="text-center text-muted-foreground py-12">
                <Bot className="mx-auto h-12 w-12 mb-4" />
                <p>No messages yet. Ask me anything!</p>
            </div>
          )}
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex items-start gap-4",
                message.role === "user" ? "justify-end" : "justify-start"
              )}
            >
              {message.role === "assistant" && (
                <Avatar className="h-8 w-8 border border-primary">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    <Bot size={18}/>
                  </AvatarFallback>
                </Avatar>
              )}
              <div
                className={cn(
                  "max-w-md rounded-lg px-4 py-3 shadow-sm",
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary"
                )}
              >
                <p className="whitespace-pre-wrap text-sm">{message.content}</p>
              </div>
               {message.role === "user" && (
                <Avatar className="h-8 w-8 border border-accent">
                  <AvatarFallback className="bg-accent text-accent-foreground">
                    <User size={18}/>
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          {isLoading && (
             <div className="flex items-start gap-4 justify-start">
                <Avatar className="h-8 w-8 border border-primary">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    <Bot size={18}/>
                  </AvatarFallback>
                </Avatar>
                <div className="max-w-md rounded-lg px-4 py-3 shadow-sm bg-secondary flex items-center">
                    <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                </div>
             </div>
          )}
        </div>
      </ScrollArea>
      <div className="border-t p-4 bg-background">
        <form onSubmit={handleSendMessage} className="flex items-center gap-4">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question..."
            className="flex-1"
            disabled={isLoading}
          />
          <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </div>
    </div>
  );
}
