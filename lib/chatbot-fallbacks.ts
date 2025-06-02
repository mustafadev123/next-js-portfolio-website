// Basic local fallbacks for the chatbot when the API isn't available
// This helps during local development when Groq API might not be accessible

type FallbackResponse = {
  text: string;
  suggestions?: string[];
};

const greetings = [
  "Hi! I'm Muhammad's portfolio assistant. How can I help you today?",
  "Hello there! I'm here to tell you about Muhammad's work and skills. What would you like to know?",
  "Hey! Welcome to Muhammad's portfolio. I'm his AI assistant and can answer questions about his projects and experience.",
  "Greetings! I'm Muhammad's AI assistant. How can I help you explore his portfolio today?"
];

const projectResponses = [
  "Muhammad has worked on several impressive projects including MindSync (a mental health platform), Crop Visualization Platform, and Urdu News Classification. Which one would you like to hear more about?",
  "Muhammad's portfolio includes diverse projects ranging from AI/ML (like the Multimodal TB Detection) to web development (like the Nike Clone E-commerce). What type of projects interest you most?"
];

const skillResponses = [
  "Muhammad is skilled in Python, C++, Java, Go, and several frameworks including Node.js, Spring Boot, Laravel, and Django. He's also experienced with databases like MySQL and MongoDB. What specific skills would you like to know more about?",
  "Muhammad has a strong technical foundation with programming languages (Python, C++, Java), frameworks (React, Node.js, Spring Boot), and tools (Git, Docker, AWS). Which area would you like me to elaborate on?"
];

const aboutResponses = [
  "Muhammad is a Software Engineer and ML Enthusiast currently studying BSc Computer Science at LUMS with a GPA of 3.70. He has experience at multiple companies and a passion for building innovative solutions. What would you like to know about him?",
  "Muhammad Mustafa is studying Computer Science at LUMS and has professional experience as a Backend Engineer and SWE Intern. He specializes in both software development and machine learning. Any specific aspect of his background you're curious about?"
];

const contactResponses = [
  "You can reach Muhammad via email at mustufashadab123@gmail.com or by phone: +92-309-3300668. His GitHub is https://github.com/Negatrin and LinkedIn: https://www.linkedin.com/in/muhammad-mustufa-02a108230/. How would you prefer to contact him?",
  "The best way to contact Muhammad is through his email (mustufashadab123@gmail.com) or LinkedIn profile. Would you like me to help you draft a message to him?"
];

/**
 * Provides a fallback response when the API is unavailable
 */
export function getFallbackResponse(message: string): FallbackResponse {
  const lowerMessage = message.toLowerCase().trim();
  
  // Handle greetings
  if (/^(hi|hello|hey|greetings|howdy|hi there|hello there|what's up)$/i.test(lowerMessage)) {
    return {
      text: getRandomItem(greetings),
      suggestions: ["Tell me about his projects", "What are his skills?", "How can I contact him?"]
    };
  }
  
  // Handle project inquiries
  if (lowerMessage.includes("project") || lowerMessage.includes("work") || lowerMessage.includes("portfolio")) {
    return {
      text: getRandomItem(projectResponses),
      suggestions: ["MindSync project", "Crop Visualization", "AI/ML projects", "Web development"]
    };
  }
  
  // Handle skill inquiries
  if (lowerMessage.includes("skill") || lowerMessage.includes("know") || lowerMessage.includes("tech") || 
      lowerMessage.includes("language") || lowerMessage.includes("framework")) {
    return {
      text: getRandomItem(skillResponses),
      suggestions: ["Programming languages", "Frameworks", "Databases", "Tools"]
    };
  }
  
  // Handle about inquiries
  if (lowerMessage.includes("about") || lowerMessage.includes("who") || lowerMessage.includes("background") || 
      lowerMessage.includes("education") || lowerMessage.includes("study")) {
    return {
      text: getRandomItem(aboutResponses),
      suggestions: ["Education", "Work background", "Personal interests"]
    };
  }
  
  // Handle contact inquiries
  if (lowerMessage.includes("contact") || lowerMessage.includes("email") || lowerMessage.includes("phone") || 
      lowerMessage.includes("reach") || lowerMessage.includes("linkedin") || lowerMessage.includes("github")) {
    return {
      text: getRandomItem(contactResponses),
      suggestions: ["Email", "LinkedIn", "GitHub"]
    };
  }
  
  // Default response for unrecognized queries
  return {
    text: "I can provide information about Muhammad's projects, skills, background, or contact information. What would you like to know?",
    suggestions: ["Projects", "Skills", "About Muhammad", "Contact"]
  };
}

function getRandomItem<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}
