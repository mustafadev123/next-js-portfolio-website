"use client"

import { useEffect, useState } from "react"
import { MessageSquare } from "lucide-react"
import { openChatbot } from "@/components/chatbot-events"

export function LocalTime({ timeZone, label, className }: { timeZone: string; label: string; className?: string }) {
  const [time, setTime] = useState<string | null>(null)

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone })
    const tick = () => setTime(fmt.format(new Date()))
    tick()
    const id = setInterval(tick, 15_000)
    return () => clearInterval(id)
  }, [timeZone])

  return (
    <span className={className ?? "eyebrow whitespace-nowrap tabular-nums"}>
      {label} <span className="text-foreground">{time ?? "--:--"}</span>
    </span>
  )
}

export function AskAssistantButton({ className }: { className?: string }) {
  return (
    <button type="button" onClick={openChatbot} className={className}>
      <MessageSquare aria-hidden="true" className="h-4 w-4" />
      <span className="link-draw">Ask my AI assistant</span>
    </button>
  )
}
