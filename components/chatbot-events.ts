// Lets any component open the chatbot without sharing React state with it.
export const CHATBOT_OPEN_EVENT = "chatbot:open"

export const openChatbot = () => window.dispatchEvent(new Event(CHATBOT_OPEN_EVENT))
