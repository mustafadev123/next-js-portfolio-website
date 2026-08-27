"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Github, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon"

export default function Contact() {
  return (
    <div className="min-h-screen pt-16 flex flex-col">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex-1 flex flex-col">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">Get In Touch</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Have a project in mind or want to collaborate? I&apos;d love to hear from you!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 flex-1">
          {/* Left: Send me an Email */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex h-full"
          >
            <div className="relative flex-1 flex flex-col">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/15 to-blue-600/25 blur-md rounded-xl transform translate-y-1 scale-[0.98]" />
              <Card className="h-full relative bg-card/90 backdrop-blur-sm z-10 flex flex-col justify-between">
                <div>
                  <CardHeader>
                    <CardTitle>Send me an Email</CardTitle>
                    <CardDescription>
                      Click the button below to open your email client and send me a message directly.
                    </CardDescription>
                  </CardHeader>
                </div>
                {/* Friendly message and large envelope icon in the middle */}
                <div className="flex flex-col items-center justify-center flex-1">
                  <Mail className="h-16 w-16 text-primary/60 mb-4 animate-pulse" />
                  <span className="text-muted-foreground text-lg text-center">Let&apos;s build something amazing together!</span>
                </div>
                <CardContent className="flex flex-col items-center justify-end pb-8 flex-1 w-full">
                  <Button
                    asChild
                    size="lg"
                    className="flex items-center gap-2 text-lg px-6 py-3 w-full mt-4"
                    variant="default"
                  >
                    <a href="mailto:mustufashadab123@gmail.com">
                      <Mail className="h-6 w-6" />
                      Email
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          {/* Right: Info cards stacked */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Contact Details */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/15 to-blue-600/25 blur-md rounded-xl transform translate-y-1 scale-[0.98]" />
              <Card className="h-full relative bg-card/90 backdrop-blur-sm z-10">
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                  <CardDescription>Feel free to reach out through any of these channels.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-muted-foreground">mustufashadab123@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-muted-foreground">+92-309-3300668</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-muted-foreground">Karachi, Pakistan</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            {/* Social Links */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/15 to-purple-600/25 blur-md rounded-xl transform translate-y-1 scale-[0.98]" />
              <Card className="h-full relative bg-card/90 backdrop-blur-sm z-10">
                <CardHeader>
                  <CardTitle>Connect with me</CardTitle>
                  <CardDescription>Follow me on social media for updates and insights.</CardDescription>
                </CardHeader>
                <CardContent>
                  <TooltipProvider>
                    <div className="flex space-x-4">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline" size="icon" asChild>
                            <a href="https://github.com/mustafadev123" target="_blank" rel="noopener noreferrer">
                              <Github className="h-5 w-5" />
                            </a>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>GitHub</p>
                        </TooltipContent>
                      </Tooltip>
                      
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline" size="icon" asChild>
                            <a href="https://www.linkedin.com/in/muhammad-mustufa-02a108230/" target="_blank" rel="noopener noreferrer">
                              <Linkedin className="h-5 w-5" />
                            </a>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>LinkedIn</p>
                        </TooltipContent>
                      </Tooltip>
                      
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline" size="icon" asChild>
                            <a href="mailto:mustufashadab123@gmail.com">
                              <Mail className="h-5 w-5" />
                            </a>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Email</p>
                        </TooltipContent>
                      </Tooltip>
                      
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline" size="icon" asChild className="text-green-500 hover:text-green-600 hover:border-green-500">
                            <a 
                              href="https://wa.me/923093300668?text=Hi%20Muhammad%2C%20I%20visited%20your%20portfolio%20website%20and%20I'm%20interested%20in%20discussing%20a%20potential%20project%20or%20opportunity." 
                              target="_blank" 
                              rel="noopener noreferrer"
                            >
                              <WhatsAppIcon className="h-5 w-5" />
                            </a>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>WhatsApp</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </TooltipProvider>
                </CardContent>
              </Card>
            </div>
            {/* Availability */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/15 to-pink-600/25 blur-md rounded-xl transform translate-y-1 scale-[0.98]" />
              <Card className="h-full relative bg-card/90 backdrop-blur-sm z-10">
                <CardHeader>
                  <CardTitle>Availability</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full" />
                      <span className="text-sm">Available for freelance projects</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full" />
                      <span className="text-sm">Open to collaboration</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                      <span className="text-sm">Currently studying at LUMS</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
