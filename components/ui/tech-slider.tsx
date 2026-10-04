"use client"

import React from "react"
import { motion } from "framer-motion"
import Image from "next/image"

interface Technology {
  name: string
  logo: string
}

const technologies: Technology[] = [
  { name: "React", logo: "/react.png" },
  { name: "Next.js", logo: "/nextjs.png" },
  { name: "Laravel", logo: "/laravel.png" },
  { name: "Spring Boot", logo: "/springboot.png" },
  { name: "Python", logo: "/python.png" },
  { name: "Java", logo: "/java.png" },
  { name: "Docker", logo: "/docker.png" },
  { name: "AWS", logo: "/aws.png" },
  { name: "MongoDB", logo: "/mongodb.png" },
  { name: "MySQL", logo: "/my_sql.png" },
]

const extendedTechnologies = [...technologies, ...technologies]

export function TechSlider({ className = "" }: { className?: string }) {
  return (
    <div
      className={"relative w-full overflow-hidden py-2 " + className}
      aria-label="Technologies used"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-background to-transparent sm:w-16" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-background to-transparent sm:w-16" />

      <motion.div
        className="flex w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 30,
            ease: "linear",
          },
        }}
      >
        {extendedTechnologies.map((tech, index) => (
          <div
            key={`${tech.name}-${index}`}
            className="flex h-20 w-36 shrink-0 items-center justify-center px-3 sm:w-44"
          >
            <div className="group flex h-16 w-full items-center justify-center rounded-2xl border border-slate-200/40 bg-slate-900/5 px-4 backdrop-blur-sm transition-all duration-300 hover:border-blue-400/35 hover:bg-slate-900/10 dark:border-white/10 dark:bg-white/[0.03] dark:hover:bg-white/[0.07]">
              <Image
                src={tech.logo}
                alt={tech.name}
                width={120}
                height={56}
                className="h-10 w-auto object-contain opacity-70 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0"
              />
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export default TechSlider
