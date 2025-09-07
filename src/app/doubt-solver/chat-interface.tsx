
"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { resolveStudentDoubts, ResolveStudentDoubtsOutput } from "@/ai/flows/resolve-student-doubts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, User, Bot, Loader2, Paperclip, X, FileText, PlusCircle, Trash2, MessageSquare, History, Lightbulb, HelpCircle, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

type Message = {
  id: string;
  role: "user" | "assistant" | "model";
  content: string;
  image?: string;
  pdf?: { name: string };
  analysis?: Omit<ResolveStudentDoubtsOutput, 'answer' | 'explanation'>;
};

type Chat = {
    id: string;
    title: string;
    messages: Message[];
}

export default function ChatInterface() {
  const [chats, setChats] = useState<Record<string, Chat>>({});
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [pdf, setPdf] = useState<{name: string, data: string} | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const activeChat = activeChatId ? chats[activeChatId] : null;

  // Load chats from localStorage on initial render
  useEffect(() => {
    try {
      const savedChats = localStorage.getItem("doubtSolverChats");
      if (savedChats) {
        const parsedChats = JSON.parse(savedChats);
        setChats(parsedChats);
        const lastActiveId = localStorage.getItem("doubtSolverLastActiveId");
        if (lastActiveId && parsedChats[lastActiveId]) {
            setActiveChatId(lastActiveId);
        } else if (Object.keys(parsedChats).length > 0) {
            setActiveChatId(Object.keys(parsedChats)[0]);
        } else {
            handleNewChat();
        }
      } else {
        handleNewChat();
      }
    } catch (error) {
      console.error("Failed to load chats from localStorage", error);
      handleNewChat();
    }
  }, []);

  // Save chats to localStorage whenever they change
  useEffect(() => {
    if (Object.keys(chats).length > 0) {
      localStorage.setItem("doubtSolverChats", JSON.stringify(chats));
    }
    if (activeChatId) {
      localStorage.setItem("doubtSolverLastActiveId", activeChatId);
    }
  }, [chats, activeChatId]);


  useEffect(() => {
    if (scrollAreaRef.current) {
        scrollAreaRef.current.scrollTo({
            top: scrollAreaRef.current.scrollHeight,
            behavior: 'smooth'
        });
    }
  }, [activeChat?.messages, isLoading]);

  const handleNewChat = useCallback(() => {
    const newChatId = Date.now().toString();
    const newChat: Chat = {
      id: newChatId,
      title: "New Chat",
      messages: [],
    };
    setChats(prev => ({ ...prev, [newChatId]: newChat }));
    setActiveChatId(newChatId);
    setInput("");
    setImage(null);
    setPdf(null);
  }, []);

  const handleClearHistory = () => {
    setChats({});
    setActiveChatId(null);
    localStorage.removeItem("doubtSolverChats");
    localStorage.removeItem("doubtSolverLastActiveId");
    handleNewChat();
    toast({
        title: "History Cleared",
        description: "All your chats have been deleted.",
    })
  }

  const handleDeleteChat = (chatId: string) => {
    setChats(prev => {
        const newChats = {...prev};
        delete newChats[chatId];
        return newChats;
    });
    if (activeChatId === chatId) {
        const remainingChatIds = Object.keys(chats).filter(id => id !== chatId);
        if (remainingChatIds.length > 0) {
            setActiveChatId(remainingChatIds[0]);
        } else {
            handleNewChat();
        }
    }
    toast({
        title: "Chat Deleted",
        description: "The selected chat has been removed.",
    })
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        setImage(loadEvent.target?.result as string);
        setPdf(null);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
          setPdf({ name: file.name, data: loadEvent.target?.result as string});
          setImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeChatId || (!input.trim() && !image && !pdf) || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      ...(image && { image }),
      ...(pdf && { pdf: { name: pdf.name } }),
    };
    
    const newMessages = [...(activeChat?.messages || []), userMessage];
    
    // Auto-generate title from first message
    const isFirstMessage = (activeChat?.messages.length || 0) === 0;
    const newTitle = isFirstMessage && input.trim() ? input.trim().substring(0, 30) + '...' : activeChat?.title;

    setChats(prev => ({
        ...prev,
        [activeChatId]: {
            ...prev[activeChatId],
            title: newTitle || prev[activeChatId].title,
            messages: newMessages,
        }
    }));

    setInput("");
    setImage(null);
    setPdf(null);
    setIsLoading(true);

    try {
      const history = newMessages.slice(0, -1).map(msg => ({
          role: msg.role === 'assistant' ? 'model' : 'user',
          content: msg.content,
      }));

      const result = await resolveStudentDoubts({ 
        question: input,
        history,
        imageDataUri: image || undefined,
        pdfDataUri: pdf?.data || undefined,
       });

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: result.answer + (result.explanation ? `\n\n**Explanation:**\n${result.explanation}` : ''),
        analysis: {
            summary: result.summary,
            keyConcepts: result.keyConcepts,
            practiceQuestions: result.practiceQuestions,
        }
      };
       setChats(prev => ({
        ...prev,
        [activeChatId]: {
            ...prev[activeChatId],
            messages: [...newMessages, assistantMessage],
        }
    }));
    } catch (error) {
      console.error(error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again.",
      };
       setChats(prev => ({
        ...prev,
        [activeChatId]: {
            ...prev[activeChatId],
            messages: [...newMessages, errorMessage],
        }
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const chatHistory = Object.values(chats).sort((a,b) => parseInt(b.id) - parseInt(a.id));

  return (
    <div className="flex h-full w-full flex-col bg-background">
        <header className="flex items-center justify-between p-4 border-b">
             <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline">
                        <History className="mr-2 h-4 w-4" />
                        Chat History
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 p-0">
                    <SheetHeader className="p-4 border-b">
                        <SheetTitle>Conversation History</SheetTitle>
                    </SheetHeader>
                    <div className="p-4 space-y-2">
                        {chatHistory.map(chat => (
                            <div key={chat.id} className="flex items-center group">
                                <Button
                                    variant={activeChatId === chat.id ? "secondary" : "ghost"}
                                    className="w-full justify-start gap-2 truncate"
                                    onClick={() => setActiveChatId(chat.id)}
                                >
                                    <MessageSquare className="h-4 w-4" />
                                    <span className="truncate">{chat.title}</span>
                                </Button>
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100">
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </AlertDialogTrigger>
                                     <AlertDialogContent>
                                        <AlertDialogHeader>
                                        <AlertDialogTitle>Delete this chat?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This will permanently delete "{chat.title}". This action cannot be undone.
                                        </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => handleDeleteChat(chat.id)}>Confirm Delete</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        ))}
                    </div>
                     <Separator />
                      <div className="p-4">
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="destructive" className="w-full">
                                    <Trash2 className="mr-2 h-4 w-4" /> Clear All History
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This will permanently delete all your chat history. This action cannot be undone.
                                </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={handleClearHistory}>Confirm Delete All</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </SheetContent>
            </Sheet>
            <h1 className="text-xl font-semibold">{activeChat?.title || "Doubt Solver"}</h1>
            <Button variant="outline" size="icon" onClick={handleNewChat}>
                <PlusCircle className="h-5 w-5" />
            </Button>
        </header>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          <ScrollArea className="flex-1 p-6" ref={scrollAreaRef}>
            <div className="space-y-6">
              {(!activeChat || activeChat.messages.length === 0) && (
                <div className="text-center text-muted-foreground py-12 flex flex-col items-center justify-center h-full">
                    <Bot className="mx-auto h-12 w-12 mb-4" />
                    <p>No messages yet. Ask me anything!</p>
                     <p className="text-sm mt-2">You can also upload a PDF and ask for a summary.</p>
                </div>
              )}
              {activeChat?.messages.map((message) => (
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
                      "max-w-2xl w-full rounded-lg px-4 py-3 shadow-sm",
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary"
                    )}
                  >
                    {message.image && (
                        <div className="relative aspect-video w-full overflow-hidden rounded-md border mb-2">
                            <Image src={message.image} alt="User upload" fill className="object-contain"/>
                        </div>
                    )}
                     {message.pdf && (
                        <div className="flex items-center gap-2 p-2 rounded-md bg-primary/10 mb-2">
                            <FileText className="h-5 w-5 text-primary-foreground/80" />
                            <span className="text-sm font-medium truncate">{message.pdf.name}</span>
                        </div>
                    )}
                    <p className="whitespace-pre-wrap text-sm">{message.content}</p>

                     {message.analysis && (message.analysis.summary || (message.analysis.keyConcepts && message.analysis.keyConcepts.length > 0) || (message.analysis.practiceQuestions && message.analysis.practiceQuestions.length > 0)) && (
                        <Card className="mt-4 bg-background/50">
                            <CardHeader>
                                <CardTitle className="text-lg font-headline">Detailed Analysis</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {message.analysis.summary && (
                                    <div>
                                        <h4 className="font-semibold text-base mb-2 flex items-center"><BookOpen className="w-4 h-4 mr-2" />Summary</h4>
                                        <p className="text-sm text-muted-foreground prose prose-sm dark:prose-invert">{message.analysis.summary}</p>
                                    </div>
                                )}
                                {message.analysis.keyConcepts && message.analysis.keyConcepts.length > 0 && (
                                     <div>
                                        <h4 className="font-semibold text-base mb-2 flex items-center"><Lightbulb className="w-4 h-4 mr-2" />Key Concepts</h4>
                                        <Accordion type="single" collapsible className="w-full">
                                            {message.analysis.keyConcepts.map((item, index) => (
                                                <AccordionItem value={`concept-${index}`} key={index}>
                                                    <AccordionTrigger>{item.concept}</AccordionTrigger>
                                                    <AccordionContent className="text-muted-foreground">
                                                        {item.explanation}
                                                    </AccordionContent>
                                                </AccordionItem>
                                            ))}
                                        </Accordion>
                                    </div>
                                )}
                                {message.analysis.practiceQuestions && message.analysis.practiceQuestions.length > 0 && (
                                    <div>
                                        <h4 className="font-semibold text-base mb-2 flex items-center"><HelpCircle className="w-4 h-4 mr-2" />Practice Questions</h4>
                                        <div className="space-y-2">
                                            {message.analysis.practiceQuestions.map((item, index) => (
                                                <div key={index} className="p-3 bg-secondary/50 rounded-md">
                                                    <p className="font-medium">Q: {item.question}</p>
                                                    <p className="text-sm text-green-600 dark:text-green-400 mt-1">A: {item.answer}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                     )}
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
            <form onSubmit={handleSendMessage} className="space-y-4">
                <div className="flex items-start gap-4">
                  {image && (
                    <div className="relative w-32 h-32 group">
                      <Image src={image} alt="Selected image" layout="fill" className="rounded-md object-cover" />
                      <Button
                        type="button"
                        size="icon"
                        variant="destructive"
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => setImage(null)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                   {pdf && (
                    <div className="relative w-48 group bg-secondary p-3 rounded-lg flex items-center gap-2">
                      <FileText className="h-6 w-6 text-secondary-foreground" />
                      <p className="text-sm truncate flex-1">{pdf.name}</p>
                      <Button
                        type="button"
                        size="icon"
                        variant="destructive"
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => setPdf(null)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              <div className="flex items-center gap-4">
                 <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => imageInputRef.current?.click()}
                    disabled={isLoading || !!pdf}
                  >
                    <Paperclip className="h-4 w-4" />
                    <span className="sr-only">Upload Image</span>
                  </Button>
                  <Input
                    type="file"
                    ref={imageInputRef}
                    onChange={handleImageChange}
                    className="hidden"
                    accept="image/*"
                  />
                   <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => pdfInputRef.current?.click()}
                    disabled={isLoading || !!image}
                  >
                    <FileText className="h-4 w-4" />
                    <span className="sr-only">Upload PDF</span>
                  </Button>
                  <Input
                    type="file"
                    ref={pdfInputRef}
                    onChange={handlePdfChange}
                    className="hidden"
                    accept="application/pdf"
                  />
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your question or ask to summarize a PDF..."
                  className="flex-1"
                  disabled={isLoading}
                />
                <Button type="submit" size="icon" disabled={isLoading || (!input.trim() && !image && !pdf)}>
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  <span className="sr-only">Send</span>
                </Button>
              </div>
            </form>
          </div>
        </div>
    </div>
  );
}
