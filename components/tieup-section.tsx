"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const partners = [
  { name: "Technical Partner 1", logo: "/t1.png" },
  { name: "Technical Partner 2", logo: "/t2.png" },
  { name: "Technical Partner 3", logo: "/t3.png" },
  { name: "Technical Partner 4", logo: "/t4.png" },
  { name: "Joy E-Bike", logo: "/cp3.png" },
]

const TieUpSection = () => {
  return (
    <motion.section
      className="py-16 bg-gray-100 overflow-hidden relative"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8 }}
    >
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-100 to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-100 to-transparent z-10" />

      <div className="container">
        <motion.h2
          className="text-3xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          We are Tie-Up With
        </motion.h2>

        <div className="relative">
          <motion.div
            className="flex space-x-16"
            animate={{
              x: [0, -100 * partners.length],
            }}
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
  )
}

export default TieUpSection

