"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialouge"
import { Footer } from "@/components/footer"
import { AchievementSlideshow } from "@/components/achievement-slideshow"
import { ContactForm } from "@/app/Contact-form"
// import { SiteHeader } from "@/components/site-header"

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export default function Home() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const partners = [
    { name: "Technical Partner 1", logo: "/t1.png" },
    { name: "Technical Partner 2", logo: "/t2.png" },
    { name: "Technical Partner 3", logo: "/t3.png" },
    { name: "Technical Partner 4", logo: "/t4.png" },
    { name: "Joy E-Bike", logo: "/cp3.png" },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      {/* <SiteHeader /> */}
      <main className="flex-1">
        <motion.section
          className="relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Background image with parallax effect */}
          <motion.div className="absolute inset-0 z-[-2]" style={{ scale, opacity }}>
            <Image
              src="/clg.jpg"
              alt="College campus background"
              fill
              style={{ objectFit: "cover" }}
              quality={100}
              priority
            />
          </motion.div>

          <div className="container relative z-10 min-h-[600px] flex items-center">
            <div className="w-full max-w-3xl mx-auto py-12">
              <motion.div
                className="flex flex-col justify-center text-white space-y-8"
                variants={stagger}
                initial="initial"
                animate="animate"
              >
                <motion.h1
                  className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-center"
                  variants={fadeIn}
                >
                  Start your career with a new way of learning
                </motion.h1>
                <motion.div className="flex justify-center" variants={fadeIn}>
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
            </div>
          </div>
        </motion.section>

        {/* About Institute Section */}
        <motion.section
          className="py-16 bg-white"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
        >
          <div className="container">
            <motion.h2 className="text-3xl font-bold text-center mb-8" variants={fadeIn}>
              About Our Institute
            </motion.h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <motion.div
                variants={fadeIn}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <p className="text-lg mb-4">
                  The institute intends to achieve development of technical and non-technical skills in students by
                  providing them best of quality education. The institute aims to prepare students for higher education
                  as well as making them employable after successful completion of course. The institute campus has well
                  developed laboratories, library, class rooms, hostel, canteen & play ground with all amenities. It is
                  one of the best diploma in engineering colleges (Polytechnic) in Pune.
                </p>
              </motion.div>
              <motion.div
                className="relative h-64 md:h-full"
                variants={fadeIn}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Image
                  src="/clg.jpg"
                  alt="Institute building showcasing modern facilities"
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-lg"
                />
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Student Achievements Section */}
        <motion.section
          className="py-16 bg-gray-100"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
        >
          <div className="container">
            <motion.h2 className="text-3xl font-bold text-center mb-8" variants={fadeIn}>
              Student Achievements
            </motion.h2>
            <motion.div
              variants={fadeIn}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <AchievementSlideshow />
            </motion.div>
          </div>
        </motion.section>

        {/* Importance of Technical Institution Section */}
        <motion.section
          className="py-16 bg-primary text-white"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
        >
          <div className="container">
            <motion.h2 className="text-3xl font-bold text-center mb-8" variants={fadeIn}>
              Importance of Technical Education
            </motion.h2>
            <motion.div className="grid md:grid-cols-3 gap-8" variants={stagger}>
              {[
                {
                  title: "Innovation Drivers",
                  content:
                    "Technical institutions are at the forefront of driving innovation and technological advancements.",
                },
                {
                  title: "Skill Development",
                  content:
                    "We focus on developing practical skills that are crucial in today's rapidly evolving job market.",
                },
                {
                  title: "Economic Growth",
                  content:
                    "Technical education plays a vital role in fostering economic growth and industrial development.",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
                  <p>{item.content}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Our Recruiters Section */}
        <motion.section
          className="py-16 bg-white"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
        >
          <div className="container">
            <motion.h2 className="text-3xl font-bold text-center mb-8" variants={fadeIn}>
              Our Recruiters
            </motion.h2>
            <motion.div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 sm:gap-4" variants={stagger}>
              {[
                { name: "3S Properties", logo: "/cp1.png" },
                { name: "Hyundai", logo: "/cp2.png" },
                { name: "Joy e-bike", logo: "/cp3.png" },
                { name: "Rahitech", logo: "/cp4.png" },
              ].map((company, index) => (
                <motion.div
                  key={company.name}
                  className="bg-gray-100 h-16 sm:h-20 flex items-center justify-center rounded-lg p-2 sm:p-3 hover:shadow-lg transition-shadow"
                  variants={fadeIn}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Image
                    src={company.logo || "/placeholder.svg"}
                    alt={`${company.name} logo`}
                    width={80}
                    height={40}
                    style={{ objectFit: "contain" }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Our Tie-up Section */}
        <motion.section
          className="py-16 bg-gray-100 overflow-hidden relative"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
        >
          {/* Gradient overlays for smooth transition */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-100 to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-100 to-transparent z-10" />

          <div className="container">
            <motion.h2 className="text-3xl font-bold text-center mb-12" variants={fadeIn}>
              We are Tie-Up With
            </motion.h2>

            <div className="relative">
              <motion.div
                className="flex items-center justify-center gap-16 py-4"
                initial={{ x: "100%" }}
                animate={{ x: "-100%" }}
                transition={{
                  x: {
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                    duration: 20,
                    ease: "linear",
                  },
                }}
              >
                {[...partners, ...partners].map((partner, index) => (
                  <motion.div
                    key={`${partner.name}-${index}`}
                    className="flex-shrink-0 w-48 h-24 flex items-center justify-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Image
                      src={partner.logo || "/placeholder.svg"}
                      alt={`${partner.name} logo`}
                      width={180}
                      height={90}
                      className="max-w-full max-h-full object-contain"
                      style={{ filter: "grayscale(0.2)" }}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.section>
      </main>
      <Footer />
    </div>
  )
}

