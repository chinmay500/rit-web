"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const recruiters = [
  { name: "3S Properties", logo: "/cp1.png" },
  { name: "Hyundai", logo: "/cp2.png" },
  { name: "Joy e-bike", logo: "/cp3.png" },
  { name: "Rahitech", logo: "/cp4.png" },
]

const RecruitersSection = () => {
  return (
    <motion.section
      className="py-16 bg-white"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container">
        <motion.h2
          className="text-3xl font-bold text-center mb-8 text-primary-800"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Our Recruiters
        </motion.h2>
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-4 gap-6"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          {recruiters.map((company) => (
            <motion.div
              key={company.name}
              className="bg-primary-50 h-32 flex items-center justify-center rounded-lg p-4 hover:shadow-lg transition-shadow"
              variants={{
                hidden: { opacity: 0, y: 50 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.05, backgroundColor: "#cce7ff" }}
              whileTap={{ scale: 0.95 }}
            >
              <Image
                src={company.logo || "/placeholder.svg"}
                alt={`${company.name} logo`}
                width={120}
                height={60}
                style={{ objectFit: "contain" }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  )
}

export default RecruitersSection

