"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialouge"
import { ContactForm } from "@/app/Contact-form"

const HeroSection = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const y = useTransform(scrollYProgress, [0, 1], [0, 200])

  return (
    <motion.section
      className="relative h-screen flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div className="absolute inset-0 z-0" style={{ scale, opacity }}>
        <Image
          src="/clg.jpg"
          alt="College campus background"
          fill
          style={{ objectFit: "cover" }}
          quality={100}
          priority
        />
        <div className="absolute inset-0 bg-primary-900 bg-opacity-50" />
      </motion.div>
      <motion.div className="relative z-10 text-center text-white px-4 md:px-0" style={{ y }}>
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 md:mb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Start your career with a new way of learning
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                size="lg"
                className="text-base md:text-lg bg-secondary-500 hover:bg-secondary-600 text-primary-900 hover:scale-105 transition-transform"
              >
                Contact Us Now
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Contact Us</DialogTitle>
              </DialogHeader>
              <ContactForm />
            </DialogContent>
          </Dialog>
        </motion.div>
      </motion.div>
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
      >
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </motion.div>
    </motion.section>
  )
}

export default HeroSection

