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
      <motion.div className="absolute inset-0 z-[-2]" style={{ scale, opacity }}>
        <Image
          src="/rit.avif"
          alt="College campus background"
          fill
          style={{ objectFit: "cover" }}
          quality={100}
          priority
        />
      </motion.div>
      <motion.div className="relative z-10 text-center text-white" style={{ y }}>
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Start your career with a new way of learning
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="text-lg hover:scale-105 transition-transform">
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
    </motion.section>
  )
}

export default HeroSection

