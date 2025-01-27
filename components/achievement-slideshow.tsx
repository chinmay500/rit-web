"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

interface Achievement {
  id: number
  title: string
  description: string
  image: string
}

const achievements: Achievement[] = [
  {
    id: 1,
    title: "Second Prize in Logic Leap 2k24",
    description: "T.Y Computer Engineering students won at Dr.D.Y.Patil Polytechnic Pune.",
    image: "/ac1.jpeg",
  },
  {
    id: 2,
    title: "First Prize in KHO-KHO",
    description: "Won first place in inter-diploma sports competition.",
    image: "/ac2.jpeg",
  },
  {
    id: 3,
    title: "AIML Students Excel at Logic Leap 2k24",
    description: "Multiple prizes won at D.Y. Patil College event.",
    image: "/ac3.jpeg",
  },
]

export function AchievementSlideshow() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % achievements.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative w-full max-w-md mx-auto aspect-[4/3] bg-gray-200 overflow-hidden rounded-lg shadow-lg">
      <AnimatePresence initial={false}>
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <Image
            src={achievements[currentSlide].image || "/placeholder.svg"}
            alt={`${achievements[currentSlide].title}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: "cover" }}
          />
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-3 sm:p-4"
          >
            <h3 className="text-sm sm:text-base font-bold mb-1 line-clamp-1">{achievements[currentSlide].title}</h3>
            <p className="text-xs sm:text-sm line-clamp-2">{achievements[currentSlide].description}</p>
          </motion.div>
        </motion.div>
      </AnimatePresence>
      <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-2">
        {achievements.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full ${
              index === currentSlide ? "bg-white" : "bg-gray-400"
            } transition-colors duration-300`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

