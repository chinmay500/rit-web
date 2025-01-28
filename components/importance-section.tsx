"use client"

import { motion } from "framer-motion"

const importanceItems = [
  {
    title: "Innovation Drivers",
    content: "Technical institutions are at the forefront of driving innovation and technological advancements.",
  },
  {
    title: "Skill Development",
    content: "We focus on developing practical skills that are crucial in today's rapidly evolving job market.",
  },
  {
    title: "Economic Growth",
    content: "Technical education plays a vital role in fostering economic growth and industrial development.",
  },
]

const ImportanceSection = () => {
  return (
    <motion.section
      className="py-16 bg-primary text-white"
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
          Importance of Technical Education
        </motion.h2>
        <motion.div
          className="grid md:grid-cols-3 gap-8"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          {importanceItems.map((item, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 50 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
              <p>{item.content}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  )
}

export default ImportanceSection

