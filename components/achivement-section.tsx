"use client"

import { motion } from "framer-motion"
import { AchievementSlideshow } from "@/components/achievement-slideshow"

const AchievementsSection = () => {
  return (
    <motion.section
      className="py-12 md:py-16 bg-primary-100"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container px-4 md:px-6">
        <motion.h2
          className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8 text-primary-800"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Student Achievements
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <AchievementSlideshow />
        </motion.div>
      </div>
      <motion.div
        className="absolute inset-0"
        initial={{ backgroundPosition: "0 0" }}
        animate={{ backgroundPosition: "100% 100%" }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 20, ease: "linear" }}
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
      />
    </motion.section>
  )
}

export default AchievementsSection

