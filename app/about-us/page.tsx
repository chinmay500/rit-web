"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-teal-100">
      

      <main className="container mx-auto px-4 py-12">
        <motion.div initial="initial" animate="animate" variants={staggerChildren} className="space-y-12">
          <motion.h2 className="text-4xl font-bold text-center text-gray-800 mb-12" variants={fadeInUp}>
            About Our Institute
          </motion.h2>

          <motion.div variants={fadeInUp}>
            <Card className="mb-12 hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-2xl text-black">Our Story</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-black leading-relaxed">
                  The institute intends to achieve development of technical and non-technical skills in students by
                  providing them best of quality education. We aim to prepare students for higher education as well as
                  making them employable after successful completion of course. Our campus has well-developed
                  laboratories, library, classrooms, hostel, canteen & playground with all amenities. RITP is one of the
                  best diploma in engineering colleges (Polytechnic) in Pune.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div className="grid md:grid-cols-2 gap-8" variants={staggerChildren}>
            <motion.div variants={fadeInUp}>
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-2xl text-black">Our Vision</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg text-black">To develop skilled professionals through technical education.</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-2xl text-black">Our Mission</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2 text-black">
                    <li>To excel a technical knowledge in a specific domain.</li>
                    <li>To involve the faculties and students in Emerging Teaching-Learning practices.</li>
                    <li>To prepare the students for higher studies in reputed institute.</li>
                    <li>To provide skilled manpower to the society.</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-2xl text-teal-600">Why Choose RITP?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    {
                      title: "Expert Faculty",
                      description: "Learn from industry professionals and experienced educators.",
                    },
                    {
                      title: "State-of-the-art Facilities",
                      description: "Access to modern labs and equipment for hands-on learning.",
                    },
                    {
                      title: "Industry Connections",
                      description: "Strong ties with local and national companies for internships and placements.",
                    },
                  ].map((item, index) => (
                    <div key={index} className="text-center">
                      <h3 className="text-xl font-semibold mb-2 text-gray-800">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </main>

      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2023 RITP Lohegaon Pune. All rights reserved.</p>
          <div className="mt-4">
            <a href="#" className="text-teal-300 hover:text-teal-100 mx-2 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-teal-300 hover:text-teal-100 mx-2 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-teal-300 hover:text-teal-100 mx-2 transition-colors">
              Contact Us
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

