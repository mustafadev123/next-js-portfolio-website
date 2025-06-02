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

// Triple the list so it loops seamlessly
const extendedTechnologies = [
  ...technologies,
  ...technologies,
  ...technologies,
]

export function TechSlider({ className = "" }: { className?: string }) {
  return (
    <div
      className={
        "w-full overflow-hidden bg-transparent h-16 md:h-20 relative " +
        className
      }
    >
      <motion.div
        className="flex"
        animate={{ x: [0, -200 * technologies.length] }}
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
            key={index}
            className="w-[200px] md:w-[240px] flex-shrink-0 flex items-center justify-center h-full"
          >
            {/* 
              - Light mode: bg-white (or transparent over white body) + no blend, so black logos appear.
              - Dark mode: bg-[#0c101b] + mix-blend-lighten, so only white parts of the PNG show.
            */}            <div
              className={`
                relative w-28 md:w-36 h-14 md:h-18
                bg-white           /* Light mode: white background */
                dark:bg-[#0c101b]  /* Dark mode: #0c101b background */
                flex items-center justify-center
              `}
            >
              <Image
                src={tech.logo}
                alt={tech.name}
                fill
                style={{ objectFit: "contain" }}
                className={`
                  /* Light: no blend => show black on white */
                  dark:mix-blend-lighten  /* Dark: only white parts appear */
                `}
              />
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export default TechSlider
