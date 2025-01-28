'use client'

import { motion } from "framer-motion"
import { AchievementSlideshow } from "@/components/achievement-slideshow"

const AchievementsSection = () => {
  return (
    <motion.section
      className="py-16 bg-gray-100"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container">
        <motion.h2 
          className="text-3xl font-bold text-center mb-8"
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
    </motion.section>
  )
}

export default AchievementsSection
