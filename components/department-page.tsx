"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"

interface Course {
  name: string
  code: string
}

interface DepartmentPageProps {
  hodImage: string
  hodName: string
  hodQualifications: string
  departmentName: string
  introduction: string
  vision: string
  mission: string
  features: string[]
  courses: Course[]
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const slideDown = {
  initial: { y: "-100%" },
  animate: { y: 0 },
  transition: { duration: 1, ease: "easeOut" },
}

export function DepartmentPage({
  hodImage,
  hodName,
  hodQualifications,
  departmentName,
  introduction,
  vision,
  mission,
  features,
  courses,
}: DepartmentPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <motion.header
        className="relative h-[50vh] flex items-center justify-center text-white overflow-hidden"
        initial="initial"
        animate="animate"
        variants={slideDown}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 animate-gradient-x" />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative z-10 text-center">
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {departmentName} Department
          </motion.h1>
          <motion.p
            className="text-xl max-w-2xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {introduction}
          </motion.p>
        </div>
      </motion.header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        <motion.section variants={fadeInUp} initial="initial" animate="animate" className="grid md:grid-cols-3 gap-8">
          <Card className="md:col-span-2 bg-white shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">About Our Department</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="vision">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="vision">Vision</TabsTrigger>
                  <TabsTrigger value="mission">Mission</TabsTrigger>
                </TabsList>
                <TabsContent value="vision" className="mt-4">
                  <p>{vision}</p>
                </TabsContent>
                <TabsContent value="mission" className="mt-4">
                  <p>{mission}</p>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Head of Department</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <Avatar className="w-32 h-32 mb-4">
                <AvatarImage src={hodImage} alt={hodName} />
                <AvatarFallback>
                  {hodName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-semibold mb-1">{hodName}</h2>
              <p className="text-sm text-gray-600 mb-4">{hodQualifications}</p>
              <Button variant="outline">Contact HOD</Button>
            </CardContent>
          </Card>
        </motion.section>

        <motion.section variants={fadeInUp} initial="initial" animate="animate">
          <h2 className="text-3xl font-bold mb-6">Key Features</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="flex items-start pt-6">
                  <svg
                    className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p>{feature}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.section>

        <motion.section variants={fadeInUp} initial="initial" animate="animate">
          <h2 className="text-3xl font-bold mb-6">Our Courses</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <Link key={course.code} href={`/departments/${departmentName.toLowerCase()}/courses/${course.code}`}>
                <Card className="bg-white shadow-lg hover:shadow-xl transition-all cursor-pointer group">
                  <CardHeader>
                    <CardTitle className="group-hover:text-blue-600 transition-colors">{course.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">Course Code: {course.code}</p>
                    <div className="mt-4 flex justify-end">
                      <Button variant="ghost" size="sm" className="group-hover:bg-blue-100 transition-colors">
                        Learn More
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </motion.section>
      </main>
    </div>
  )
}

