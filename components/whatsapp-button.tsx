"use client";

import { Phone } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

export function WhatsAppButton() {
  const [isHovered, setIsHovered] = useState(false);
  const phoneNumber = "923093300668";
  const formattedNumber = phoneNumber.replace(/\D/g, "");
  const whatsappUrl = `https://wa.me/${formattedNumber}`;
  
  return (
    <div 
      className="fixed bottom-24 right-6 z-40 animate-in fade-in duration-700" 
      style={{ animationDelay: '1000ms' }}
    >
      <Button 
        size="icon" 
        className={`rounded-full w-12 h-12 shadow-lg bg-green-500 hover:bg-green-600 transition-all duration-300 ${
          isHovered ? "scale-110" : ""
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => window.open(whatsappUrl, "_blank")}
        aria-label="Contact on WhatsApp"
      >
        <Phone className="h-5 w-5 text-white" />
      </Button>
    </div>
  );
}
