'use client'

import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"

const AboutSection = () => {
  const { scrollYProgress } = useScroll()
  const x = useTransform(scrollYProgress, [0, 1], [0, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.6], [0, 1, 0])

  return (
    <motion.section
      className="py-16 bg-white overflow-hidden"
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
          About Our Institute
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
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
            style={{ x, opacity }}
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
  )
}

export default AboutSection
