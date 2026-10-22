// Basic local fallbacks for the chatbot when the API isn't available
// This helps during local development when Groq API might not be accessible

type FallbackResponse = {
  text: string;
  suggestions?: string[];
};

const greetings = [
  "Hello! I'm Muhammad Mustufa's AI assistant. He's a software engineer who builds the systems that make AI useful, from multi-agent analytics to real-time computer vision. What would you like to know?",
  "Hello there! Meet Muhammad Mustufa, a software engineer working across backend systems and applied AI, and an MS Computer Science student at Georgia State University. How can I help you learn more?",
  "Hello! I'm Muhammad's portfolio assistant. Ask me about his Google Summer of Code work with Google DeepMind, his backend engineering, or his AI projects.",
  "Hello and welcome! I can walk you through Muhammad Mustufa's experience, projects, and skills. Where would you like to start?"
];

const projectResponses = [
  "Muhammad has worked on several impressive projects including MindSync (a mental health platform), Crop Visualization Platform, and Urdu News Classification. Which one would you like to hear more about?",
  "Muhammad's portfolio includes diverse projects ranging from AI/ML (like the Multimodal TB Detection) to web development (like the Nike Clone E-commerce). What type of projects interest you most?"
];

const specificProjectResponses = {
  "mindsync": "I'll take you to the MindSync project! Click here to view it on the projects page.",
  "crop": "I'll take you to the Crop Visualization Platform project! Click here to view it on the projects page.",
  "nike": "I'll take you to the Nike Clone E-commerce project! Click here to view it on the projects page.",
  "serene": "I'll take you to the Serene Airlines Website project! Click here to view it on the projects page.",
  "karachi": "I'll take you to the Karachi City Guide project! Click here to view it on the projects page.",
  "urdu": "I'll take you to the Urdu News Classification project! Click here to view it on the projects page.",
  "tb": "I'll take you to the Multimodal TB Detection project! Click here to view it on the projects page.",
};

const skillResponses = [
  "Muhammad is skilled in Python, C++, Java, Go, and several frameworks including Node.js, Spring Boot, Laravel, and Django. He's also experienced with databases like MySQL and MongoDB. What specific skills would you like to know more about?",
  "Muhammad has a strong technical foundation with programming languages (Python, C++, Java), frameworks (React, Node.js, Spring Boot), and tools (Git, Docker, AWS). Which area would you like me to elaborate on?"
];

const aboutResponses = [
  "Muhammad is a software engineer focused on backend systems and applied AI. He's pursuing an MS in Computer Science at Georgia State University after a BSc in Computer Science from LUMS. What would you like to know about him?",
  "Muhammad Mustufa has worked as a Google Summer of Code contributor with Google DeepMind, a Backend Engineer at The Synergates Business Solutions, and an SWE Intern at 10Pearls. Any specific aspect of his background you're curious about?"
];

const contactResponses = [
  "You can reach Muhammad via email at mustufashadab123@gmail.com or by phone: +92-309-3300668. His GitHub is https://github.com/mustafadev123 and LinkedIn: https://www.linkedin.com/in/muhammad-mustufa-02a108230/. How would you prefer to contact him?",
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
  }  // Handle general project navigation requests
  const showProjectsRegex = /^(show|view|display|see|browse|take me to|navigate to|go to)(\s+me)?(\s+his|\s+the|\s+to|\s+through)?(\s+projects|\s+portfolio|\s+work|\s+all projects)$/i;
  const alternateProjectsRegex = /^(what\s+projects|which\s+projects|list\s+projects|projects\s+list|all\s+projects).*$/i;
  
  if (showProjectsRegex.test(lowerMessage) || alternateProjectsRegex.test(lowerMessage)) {
    return {
      text: "Hello! I'll take you to the projects page! Click here to view all of Muhammad's projects.",
      suggestions: ["MindSync project", "Crop Visualization", "AI/ML projects", "Web development"]
    };
  }
  
  // Handle specific project navigation requests
  const showSpecificRegex = /\b(show|view|display|see|browse|take me to)(\s+me)?(\s+his|\s+the)?\s+(.+?)\s+(project|platform|website|classification|detection)\b/i;
  const showMatch = lowerMessage.match(showSpecificRegex);
  
  if (showMatch) {
    const projectQuery = showMatch[4].toLowerCase();
    
    // Check for specific project mentions
    if (projectQuery.includes("mindsync") || projectQuery.includes("mental health")) {
      return {
        text: specificProjectResponses["mindsync"],
        suggestions: ["Show all projects", "What are his AI projects?"]
      };
    }
    if (projectQuery.includes("crop") || projectQuery.includes("visualization") || projectQuery.includes("satellite")) {
      return {
        text: specificProjectResponses["crop"],
        suggestions: ["Show all projects", "What are his other projects?"]
      };
    }
    if (projectQuery.includes("nike") || projectQuery.includes("e-commerce")) {
      return {
        text: specificProjectResponses["nike"],
        suggestions: ["Show all projects", "What are his other web projects?"]
      };
    }
    if (projectQuery.includes("urdu") || projectQuery.includes("news")) {
      return {
        text: specificProjectResponses["urdu"],
        suggestions: ["Show all projects", "What are his other AI projects?"]
      };
    }
    if (projectQuery.includes("tb") || projectQuery.includes("tuberculosis") || projectQuery.includes("multimodal")) {
      return {
        text: specificProjectResponses["tb"],
        suggestions: ["Show all projects", "What are his other AI projects?"]
      };
    }
    if (projectQuery.includes("serene") || projectQuery.includes("airline")) {
      return {
        text: specificProjectResponses["serene"],
        suggestions: ["Show all projects", "What are his other web projects?"]
      };
    }
    if (projectQuery.includes("karachi") || projectQuery.includes("city guide")) {
      return {
        text: specificProjectResponses["karachi"],
        suggestions: ["Show all projects", "What are his other web projects?"]
      };
    }
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
