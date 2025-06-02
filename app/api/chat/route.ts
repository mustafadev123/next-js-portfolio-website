import { groq } from "@ai-sdk/groq"
import { generateText } from "ai"
import { kv } from "@vercel/kv"

export const maxDuration = 30

const PORTFOLIO_CONTEXT = `
You are Muhammad Mustafa's AI portfolio assistant. You help visitors learn about Muhammad's background, projects, and skills.

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

    const prompt = `${PORTFOLIO_CONTEXT}

${conversationContext ? `Previous conversation:\n${conversationContext}\n` : ""}

User's current question: ${message}

${isSimpleGreeting ? `This appears to be a simple greeting. Keep your response very brief, friendly and conversational. Just welcome the user in a personal tone, mention that you're Muhammad's AI assistant and ask how you can help.` : `
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
