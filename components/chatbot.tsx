"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X, Send, Bot, User, UserIcon, Briefcase, Mail, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import { getFallbackResponse } from "@/lib/chatbot-fallbacks"

interface Message {
  id: string
  text: string
  isBot: boolean
  timestamp: Date
  suggestions?: string[]
}

const quickActions = [
  { label: "View Projects", icon: Briefcase, action: "/projects" },
  { label: "About Me", icon: UserIcon, action: "/about" },
  { label: "Contact", icon: Mail, action: "/contact" },
]

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Add welcome message when chatbot opens for the first time
      setTimeout(() => {
        addBotMessage(
          "Hello! Have you met an undergraduate student who has balanced both academic life with industrial life? You've stumbled upon one of the few who have done it. I'm Muhammad's AI assistant, ready to help you explore his impressive journey, projects, and skills. What would you like to know?",
          ["Tell me about Muhammad", "Show me his projects", "What are his skills?", "Contact information"],
        )
      }, 500)
    }
  }, [isOpen])

  const addBotMessage = (text: string, suggestions?: string[]) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isBot: true,
      timestamp: new Date(),
      suggestions,
    }
    setMessages((prev) => [...prev, newMessage])
  }

  const addUserMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isBot: false,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, newMessage])
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return

    const userMessage = inputValue.trim()
    addUserMessage(userMessage)
    setInputValue("")
    setIsLoading(true)

    // Handle simple greetings directly on the client side for immediate response
    const simpleGreetings = /^(hi|hello|hey|greetings|howdy|hi there|hello there)$/i;
    if (simpleGreetings.test(userMessage.trim()) && messages.length <= 1) {
      // Only respond with a quick greeting for the first interaction
      setTimeout(() => {
        addBotMessage(
          `Hello! Have you met an undergraduate student who has balanced both academic life with industrial life? You've stumbled upon one of the few who have done it. I'm Muhammad's AI assistant - how can I help you explore his impressive journey?`,
          ["Tell me about his projects", "What skills does he have?", "Show his work experience"]
        );
        setIsLoading(false);
      }, 500);
      return;
    }
    
    // Handle direct "show projects" requests for immediate navigation
    const showProjectsRegex = /^(show|view|display|see|browse|take me to|navigate to|go to)(\s+me)?(\s+his|\s+the|\s+to|\s+through)?(\s+projects|\s+portfolio|\s+work|\s+all projects)$/i;
    const alternateProjectsRegex = /^(what\s+projects|which\s+projects|list\s+projects|projects\s+list|all\s+projects).*$/i;
    
    if (showProjectsRegex.test(userMessage.trim()) || alternateProjectsRegex.test(userMessage.trim())) {
      addBotMessage("Hello! I'll take you to the projects page right away! 🚀");
      setTimeout(() => {
        router.push("/projects");
      }, 500);
      setIsLoading(false);
      return;
    }

    try {
      console.log("Sending message to API:", userMessage);
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
          conversationHistory: messages.slice(-5), // Send last 5 messages for context
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("API error response:", errorData);
        throw new Error(`Failed to get response: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log("API response received");

      // Check if this is a navigation response
      const lowerResponse = data.response.toLowerCase();
      
      // Check for general projects page navigation
      if (lowerResponse.includes("take you to the projects page") || 
          lowerResponse.includes("click here to view all of muhammad's projects") ||
          lowerResponse.includes("i'll take you to the projects page") ||
          lowerResponse.includes("directing you to the projects page") ||
          (lowerResponse.includes("project") && lowerResponse.includes("page") && 
           (lowerResponse.includes("take") || lowerResponse.includes("direct") || 
            lowerResponse.includes("show") || lowerResponse.includes("view")))) {
        addBotMessage("Hello! I'll take you to the projects page right away! 🚀");
        setTimeout(() => {
          router.push("/projects");
        }, 1000);
        return;
      }
      
      // Extract project name from response if it's a specific project navigation instruction
      const projectNavigationRegex = /(?:take you to|view|showing you|directing you to|navigating to|opening) the (.+?) project|(.+?) project (?:page|details|overview)/i;
      const projectMatch = data.response.match(projectNavigationRegex);
      
      if (projectMatch) {
        // Extract the project name from the first capturing group that matches
        const projectName = projectMatch[1] || projectMatch[2] || projectMatch[3];
        if (projectName) {
          // Add a short delay to show the bot message before navigating
          addBotMessage(`Taking you to the ${projectName} project! 🚀`);
          setTimeout(() => {
            router.push(`/projects?project=${encodeURIComponent(projectName.toLowerCase())}`);
          }, 1000);
          return;
        }
      }
      
      // Intelligently generate suggestions based on the response content
      const suggestions: string[] = [];

      // More targeted suggestion matching
      if (userMessage.toLowerCase().includes("project") || lowerResponse.includes("project")) {
        suggestions.push("Tell me more about MindSync", "Show the Crop Visualization project", "What are his AI projects?");
      }
      if (userMessage.toLowerCase().includes("contact") || lowerResponse.includes("contact") || lowerResponse.includes("reach") || lowerResponse.includes("email")) {
        suggestions.push("How can I contact Muhammad?", "What's his LinkedIn profile?", "Send an email");
      }
      if (userMessage.toLowerCase().includes("skill") || lowerResponse.includes("skill") || lowerResponse.includes("technology") || lowerResponse.includes("tech stack")) {
        suggestions.push("What programming languages does he know?", "Tell me about his ML skills", "Frontend or backend?");
      }
      if (userMessage.toLowerCase().includes("about") || lowerResponse.includes("about") || lowerResponse.includes("background") || lowerResponse.includes("education")) {
        suggestions.push("Where did he study?", "What's his background?", "Tell me more about his education");
      }

      addBotMessage(data.response, suggestions.length > 0 ? suggestions : undefined);
    } catch (error) {
      console.error("Error in chat request:", error);
      
      // Use local fallback system if API is unavailable
      try {
        console.log("Using fallback response system");
        const fallbackResponse = getFallbackResponse(userMessage);
        addBotMessage(
          fallbackResponse.text,
          fallbackResponse.suggestions
        );
        return;
      } catch (fallbackError) {
        console.error("Fallback system error:", fallbackError);
      }
      
      // If fallback system also fails, show a generic error
      let errorMessage = "I apologize, but I'm having trouble connecting to my AI service right now.";
      
      if (error instanceof Error) {
        if (error.message.includes("Failed to fetch") || error.message.includes("NetworkError")) {
          errorMessage = "I'm having network issues connecting to the AI service. If you're running this locally, this might be because the API key isn't configured correctly.";
        } else {
          errorMessage = "I encountered an error while processing your request. Please try again in a moment.";
        }
      }
      
      addBotMessage(
        `${errorMessage} You can still navigate Muhammad's portfolio using the menu or try these options:`,
        ["View Projects", "About Muhammad", "Contact Info"],
      );
    } finally {
      setIsLoading(false);
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    addUserMessage(suggestion)

    // Handle navigation suggestions
    if (suggestion.toLowerCase().includes("view all projects") || suggestion.toLowerCase().includes("view projects") || 
        suggestion.toLowerCase().includes("show me his projects") || suggestion.toLowerCase() === "projects" ||
        suggestion.toLowerCase() === "show his projects" || suggestion.toLowerCase() === "show projects") {
      router.push("/projects")
      addBotMessage("Taking you to the projects page! 🚀")
    } else if (suggestion.toLowerCase().includes("about") || suggestion.toLowerCase().includes("muhammad")) {
      router.push("/about")
      addBotMessage("Navigating to the about page! 👨‍💻")
    } else if (suggestion.toLowerCase().includes("contact")) {
      router.push("/contact")
      addBotMessage("Opening the contact page! 📧")
    } else {
      // For other suggestions, send as a regular message
      setInputValue(suggestion)
      setTimeout(() => handleSendMessage(), 100)
    }
  }

  const handleQuickAction = (action: string) => {
    router.push(action)
    addBotMessage(`Navigating to ${action.replace("/", "")} page! ✨`)
  }

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, type: "spring", stiffness: 260, damping: 20 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="lg"
          className="w-14 h-14 rounded-full shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0 animate-pulse-glow"
        >
          <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
            {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
          </motion.div>
        </Button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-3rem)] z-50"
          >
            <Card className="shadow-2xl border-0 bg-background/95 backdrop-blur-xl">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                  <span>Portfolio Assistant</span>
                  <div className="flex items-center space-x-1 ml-auto">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-xs text-muted-foreground">
                      {isLoading ? "Thinking..." : "Powered by Groq"}
                    </span>
                  </div>
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Quick Actions */}
                {messages.length === 0 && (
                  <div className="grid grid-cols-1 gap-2">
                    {quickActions.map((action) => (
                      <Button
                        key={action.label}
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuickAction(action.action)}
                        className="justify-start h-auto p-3"
                      >
                        <action.icon className="h-4 w-4 mr-2" />
                        <span className="text-xs">{action.label}</span>
                      </Button>
                    ))}
                  </div>
                )}

                {/* Messages */}
                <div className="h-80 overflow-y-auto space-y-3 pr-2">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}
                    >
                      <div
                        className={`flex items-start space-x-2 max-w-[80%] ${message.isBot ? "" : "flex-row-reverse space-x-reverse"}`}
                      >
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                            message.isBot ? "bg-gradient-to-r from-blue-600 to-purple-600" : "bg-primary"
                          }`}
                        >
                          {message.isBot ? (
                            <Bot className="h-3 w-3 text-white" />
                          ) : (
                            <User className="h-3 w-3 text-primary-foreground" />
                          )}
                        </div>
                        <div
                          className={`rounded-lg p-3 ${
                            message.isBot ? "bg-muted text-muted-foreground" : "bg-primary text-primary-foreground"
                          }`}
                        >
                          <p className="text-sm whitespace-pre-line">{message.text}</p>
                          {message.suggestions && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {message.suggestions.map((suggestion, index) => (
                                <Badge
                                  key={index}
                                  variant="secondary"
                                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground text-xs"
                                  onClick={() => handleSuggestionClick(suggestion)}
                                >
                                  {suggestion}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {/* Loading Indicator */}
                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="flex items-start space-x-2">
                        <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                          <Bot className="h-3 w-3 text-white" />
                        </div>
                        <div className="bg-muted rounded-lg p-3">
                          <div className="flex items-center space-x-2">
                            <Loader2 className="h-3 w-3 animate-spin" />
                            <span className="text-xs text-muted-foreground">Thinking...</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="flex space-x-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && handleSendMessage()}
                    placeholder="Ask me anything about Muhammad's portfolio..."
                    className="flex-1"
                    disabled={isLoading}
                  />
                  <Button onClick={handleSendMessage} size="icon" disabled={!inputValue.trim() || isLoading}>
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
