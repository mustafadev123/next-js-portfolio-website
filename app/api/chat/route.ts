import { groq } from "@ai-sdk/groq"
import { generateText } from "ai"
import { kv } from "@vercel/kv"

export const maxDuration = 30

const PORTFOLIO_CONTEXT = `
You are Muhammad Mustafa's AI portfolio assistant. You help visitors learn about Muhammad's background, projects, and skills.

GREETING STYLE:
- Always start responses with "Hello" (not "Hi", "Hey", or any other greeting)
- When greeting users for the first time, highlight Muhammad as someone uniquely balancing academic excellence with industrial experience
- Use phrases like "Have you met an undergraduate student who has balanced both academic life with industrial life? You've stumbled upon one of the few who have done it."
- Keep an enthusiastic tone that showcases Muhammad's exceptional journey

ABOUT MUHAMMAD MUSTAFA:
- Software Engineer & ML Enthusiast
- Currently studying BSc Computer Science at LUMS (GPA: 3.70, graduating June 2026)
- Location: Karachi, Pakistan
- Email: mustufashadab123@gmail.com
- Phone: +92-309-3300668
- GitHub: https://github.com/Negatrin
- LinkedIn: https://www.linkedin.com/in/muhammad-mustufa-02a108230/

WORK EXPERIENCE:
1. Backend Engineer at The Synergates Business Solutions (Jun 2024 - Aug 2024)
   - Engineered scalable backend systems using Laravel MVC
   - Reduced loading times by 15% through server optimization
   - Developed APIs for Markea App (React Native wedding hall platform)
   - Enhanced AI-powered Breast Cancer Club App backend
   - Integrated OpenCV with .NET for Sindh Smart Surveillance System

2. SWE Intern at 10Pearls Pakistan (Jun 2024 - Jul 2024)
   - Built full stack CRUD application using MySQL, Java Spring Boot, React, Tailwind CSS
   - Reduced software bugs by 30% through comprehensive testing with JUnit and Selenium

3. SWE Internship at Netsol Pakistan (May 2023 - Aug 2023)
   - Developed Python scripts using Flask for testing automation
   - Assisted in integrating calculation modules into Flex API

TECHNICAL SKILLS:
- Programming Languages: Python, C++, Java, Go, C, Ruby on Rails
- Frameworks: Node.js, Spring Boot, Laravel, Django, React Native
- Databases: MySQL, MongoDB
- Tools: Git, Docker, AWS

FEATURED PROJECTS:
1. MindSync - Mental Health Platform (https://sedeploy-2.vercel.app/)
   - Comprehensive mental health platform with secure authentication
   - Role-based access for patients and practitioners

2. Crop Visualization Platform (https://satellite-portal-crop.vercel.app/)
   - Interactive map with satellite imagery and NDVI overlays
   - Geospatial analysis for crop health monitoring

3. Nike Clone E-commerce (https://project-2-delta-mauve.vercel.app/)
   - Responsive e-commerce frontend with product gallery and cart

4. Serene Airlines Website (https://sereneair.com/)
   - Professional airline booking UI with dynamic search

5. Urdu News Classification (GitHub: https://github.com/ha405/Urdu-News-Classification-with-ML)
   - ML pipeline achieving 98% accuracy in classifying Urdu news articles

6. Multimodal TB Detection (GitHub: https://github.com/Negatrin/Mutlimodal_tb_detection/)
   - Explainable AI system using vision transformers for tuberculosis detection

EDUCATION:
- BSc Computer Science at LUMS (2022-2026, GPA: 3.70)
- Coursework: OOP, Data Structures, AI, Machine Learning, Deep Learning, Computer Vision, Software Engineering, Distributed Systems

Keep responses helpful, concise, and focused on Muhammad's portfolio. If asked about navigation, guide users to relevant sections. Be enthusiastic about his work and achievements.
`

export async function POST(req: Request) {
  try {
    console.log("Chat API: Request received")
    const { message, conversationHistory } = await req.json()
    console.log("Chat API: Message received:", message.substring(0, 50) + (message.length > 50 ? "..." : ""))

    // Store conversation in Redis for analytics (optional)
    try {
      const timestamp = new Date().toISOString()
      await kv.lpush("chatbot_conversations", {
        message,
        timestamp,
        ip: req.headers.get("x-forwarded-for") || "unknown",
      })
      // Keep only last 100 conversations
      await kv.ltrim("chatbot_conversations", 0, 99)
    } catch (kvError) {
      console.log("KV storage error (non-critical):", kvError)
    }

    // Build conversation context
    let conversationContext = ""
    if (conversationHistory && conversationHistory.length > 0) {
      conversationContext = conversationHistory
        .map((msg: any) => `${msg.isBot ? "Assistant" : "User"}: ${msg.text}`)
        .join("\n")
    }

    // Check for simple greetings
    const isSimpleGreeting = /^(hi|hello|hey|greetings|howdy|hi there|hello there)$/i.test(message.trim());

    // Check for general projects page navigation
    const generalProjectsRegex = /^(show|view|display|see|browse|take me to|navigate to|go to)(\s+me)?(\s+his|\s+the|\s+to|\s+through)?(\s+projects|\s+portfolio|\s+work|\s+all projects)$/i;
    const alternateProjectsRegex = /^(what\s+projects|which\s+projects|list\s+projects|projects\s+list|all\s+projects).*$/i;
    const isGeneralProjectsRequest = generalProjectsRegex.test(message.trim()) || alternateProjectsRegex.test(message.trim());
    
    // Check for specific project navigation requests
    const cropVisualizationRegex = /\b(show|tell me about|view|open|navigate to|go to|display).*crop visualization\b/i;
    const mindSyncRegex = /\b(show|tell me about|view|open|navigate to|go to|display).*mindsync\b/i;
    const nikeCloneRegex = /\b(show|tell me about|view|open|navigate to|go to|display).*nike clone\b/i;
    const sereneRegex = /\b(show|tell me about|view|open|navigate to|go to|display).*serene airlines\b/i;
    const karachiRegex = /\b(show|tell me about|view|open|navigate to|go to|display).*karachi city\b/i;
    const urduNewsRegex = /\b(show|tell me about|view|open|navigate to|go to|display).*urdu news\b/i;
    const tbDetectionRegex = /\b(show|tell me about|view|open|navigate to|go to|display).*tb detection\b/i;
    const multimodalRegex = /\b(show|tell me about|view|open|navigate to|go to|display).*multimodal\b/i;
    
    // Detect which project is being requested
    const isSpecificProjectRequest = cropVisualizationRegex.test(message) || mindSyncRegex.test(message) || 
                                    nikeCloneRegex.test(message) || sereneRegex.test(message) || 
                                    karachiRegex.test(message) || urduNewsRegex.test(message) || 
                                    tbDetectionRegex.test(message) || multimodalRegex.test(message);
                                    
    const isProjectRequest = isSpecificProjectRequest || isGeneralProjectsRequest;
    
    // Determine the specific project if it's a project request
    let projectName = "";
    if (isGeneralProjectsRequest) {
      projectName = "Projects Page"; // Special case for general projects navigation
    }
    else if (cropVisualizationRegex.test(message)) projectName = "Crop Visualization Platform";
    else if (mindSyncRegex.test(message)) projectName = "MindSync";
    else if (nikeCloneRegex.test(message)) projectName = "Nike Clone";
    else if (sereneRegex.test(message)) projectName = "Serene Airlines";
    else if (karachiRegex.test(message)) projectName = "Karachi City Guide";
    else if (urduNewsRegex.test(message) || message.toLowerCase().includes("urdu news")) projectName = "Urdu News Classification";
    else if (tbDetectionRegex.test(message) || multimodalRegex.test(message)) projectName = "Multimodal TB Detection";

    const prompt = `${PORTFOLIO_CONTEXT}

${conversationContext ? `Previous conversation:\n${conversationContext}\n` : ""}

User's current question: ${message}

${isSimpleGreeting ? 
    `This appears to be a simple greeting. Always start with "Hello" and introduce Muhammad as someone who uniquely balances both academic excellence and industrial experience. 
    
    Use one of these formats:
    - "Hello! Have you met an undergraduate student who has balanced both academic life with industrial life? You've stumbled upon one of the few who have done it. Let me introduce you to Muhammad Mustafa..."
    - "Hello there! Ever wondered how someone can excel in academics while gaining real industrial experience? Let me introduce you to Muhammad Mustafa, a rare talent balancing both worlds."
    
    Keep it brief, friendly and conversational. Mention that you're Muhammad's AI assistant and ask how you can help.` 
  : isGeneralProjectsRequest ?
    `The user is requesting to see all projects. Respond with: "I'll take you to the projects page! Click here to view all of Muhammad's projects." Make it clear that they will be immediately directed to the projects page.`
  : isSpecificProjectRequest ?
    `The user is requesting to see the "${projectName}" project. Instead of describing the project in detail, instruct them to click on a special navigation link you're providing that will take them directly to the project. Your response should be short and action-oriented, like: "I'll take you to the ${projectName} project! Click here to view it on the projects page." Include the exact project name in your response and make it clear that they'll be directed to the projects page.`
  : `
Please provide a helpful response about Muhammad Mustafa's portfolio, addressing their specific question directly. Remember to:
- Keep responses conversational and personalized, avoid generic templates
- Be concise and natural, as if you're having a real conversation
- Only mention relevant information that directly answers their question
- If they ask about projects, only highlight the most relevant ones for their query
- Use a friendly, warm tone that reflects Muhammad's personality
- For simple greetings, keep responses very brief and ask how you can help
`}

Keep responses under 150 words unless a detailed explanation is specifically requested.`

    console.log("Chat API: Sending prompt to Groq")
    const result = await generateText({
      model: groq("llama-3.1-8b-instant"),
      prompt,
      maxTokens: isSimpleGreeting ? 150 : 300,
      temperature: isSimpleGreeting ? 0.5 : 0.65, // Lower temperature for more focused responses
    })

    return Response.json({
      response: result.text,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Chat API error:", error)
    
    // Try to provide more specific error information
    let errorMessage = "I'm having trouble connecting right now. You can explore Muhammad's portfolio using the navigation menu above, or try asking me again in a moment!";
    
    if (error instanceof Error) {
      console.error(`Error type: ${error.name}, Message: ${error.message}`);
      
      // Check for specific error types
      if (error.message.includes("network")) {
        errorMessage = "I'm having network issues connecting to my AI service. This might be because you're running this locally without proper credentials. Please try again later!";
      }
    }
    
    return Response.json(
      {
        error: "Failed to generate response",
        errorDetails: error instanceof Error ? error.message : "Unknown error",
        response: errorMessage,
      },
      { status: 500 },
    )
  }
}
