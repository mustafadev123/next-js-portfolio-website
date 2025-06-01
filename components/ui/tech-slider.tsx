"use client"

import React from "react"
import { motion } from "framer-motion"
import Image from "next/image"

interface Technology {
  name: string;
  logo: string;
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

// We triple the list so it loops seamlessly
const extendedTechnologies = [...technologies, ...technologies, ...technologies]

export function TechSlider({ className = "" }: { className?: string }) {
  return (
    <div
      className={
        "w-full overflow-hidden bg-transparent h-16 md:h-20 relative " +
        className
      }
    >
      {/* ← Removed the Left Gradient Overlay */}
      {/* <div className="absolute left-0 top-0 bottom-0 w-20 
          bg-gradient-to-r from-white to-transparent 
          dark:from-gray-900 dark:to-transparent 
          z-10" /> */}

      {/* ← Removed the Right Gradient Overlay */}
      {/* <div className="absolute right-0 top-0 bottom-0 w-20
          bg-gradient-to-l from-white to-transparent
          dark:from-gray-900 dark:to-transparent
          z-10" /> */}      <motion.div
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
            className="w-[200px] md:w-[240px] flex-shrink-0 flex items-center justify-center h-full bg-transparent"
          >
            <div className="relative w-32 md:w-40 h-16 md:h-20 bg-[#0c101b] flex items-center justify-center">
              <Image
                src={tech.logo}
                alt={tech.name}
                fill
                style={{ objectFit: "contain" }}
                className="mix-blend-lighten"
              />
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export default TechSlider
