"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

const tags = { div: motion.div, header: motion.header, li: motion.li, section: motion.section }

// Fades content up once as it enters the viewport. MotionConfig (reducedMotion="user")
// turns the movement off for people who prefer reduced motion.
export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
}: {
  children: ReactNode
  className?: string
  delay?: number
  as?: keyof typeof tags
}) {
  const Tag = tags[as]
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </Tag>
  )
}
