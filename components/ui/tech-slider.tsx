"use client"

// Import Inter font (if you need it)
import { Inter } from "next/font/google"
import React from "react"
import { motion } from "framer-motion"

const inter = Inter({ subsets: ["latin"], weight: ["400", "600", "700"] })

const technologies = [
  "React",
  "Next.js",
  "Laravel",
  "Spring Boot",
  "Python",
  "Java",
  "Docker",
  "AWS",
  "MongoDB",
  "MySQL",
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
          z-10" /> */}

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
            className="w-[160px] md:w-[200px] flex-shrink-0 flex items-center justify-center h-full"
          >
            <motion.span
              whileHover={{ scale: 1.05 }}
              className="text-base md:text-lg font-normal text-gray-900 dark:text-gray-100 hover:text-black dark:hover:text-white transition-colors duration-300 ease-out"
            >
              {tech}
            </motion.span>
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export default TechSlider
