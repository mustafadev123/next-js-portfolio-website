"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"

export function CopyButton({ value, label = "Copy", className }: { value: string; label?: string; className?: string }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      // Clipboard can be blocked (permissions, insecure context); the value stays visible to copy by hand
    }
  }

  return (
    <button type="button" onClick={copy} className={className} aria-label={copied ? "Copied" : `${label}: ${value}`}>
      {copied ? <Check aria-hidden="true" className="h-4 w-4" /> : <Copy aria-hidden="true" className="h-4 w-4" />}
      <span aria-live="polite">{copied ? "Copied" : label}</span>
    </button>
  )
}
