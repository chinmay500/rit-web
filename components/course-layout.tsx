import Image from 'next/image'
import Link from 'next/link'
import { SiteHeader } from "@/components/site-header"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

interface Instructor {
  name: string
  image: string
  qualification: string
}

interface CourseLayoutProps {
  courseImage: string
  courseName: string
  courseCode: string
  courseDescription: string
  duration: string
  credits: number
  departmentName: string
  backgroundImage: string
  syllabus: string[]
  instructors: Instructor[]
}

export function CourseLayout({
  courseImage,
  courseName,
  courseCode,
  courseDescription,
  duration,
  credits,
  departmentName,
  backgroundImage,
  syllabus,
  instructors
}: CourseLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-grow">
        <div className="relative">
          <Image
            src={backgroundImage}
            alt={`${courseName} background`}
            fill
            style={{ objectFit: "cover" }}
            quality={100}
            priority
            className="blur-sm"
          />
          <div className="absolute inset-0 bg-black bg-opacity-70" />
          <div className="relative z-10 container mx-auto px-4 py-12 text-white">
            <Link href={`/departments/${departmentName.toLowerCase()}`} className="text-white hover:underline mb-4 inline-block">
              ← Back to {departmentName} Department
            </Link>
            <div className="flex flex-col md:flex-row items-start gap-8 mb-12">
              <Image
                src={courseImage}
                alt={courseName}
                width={300}
                height={200}
                className="rounded-lg object-cover"
              />
              <div>
                <h1 className="text-4xl font-bold mb-2">{courseName}</h1>
                <h2 className="text-2xl font-semibold mb-4">{courseCode}</h2>
                <p className="text-lg mb-4">{courseDescription}</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-xl font-semibold">Duration</h3>
                    <p>{duration}</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Credits</h3>
                    <p>{credits}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-white bg-opacity-10 text-white">
                <CardHeader>
                  <CardTitle>Syllabus</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5">
                    {syllabus.map((item, index) => (
                      <li key={index} className="mb-2">{item}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card className="bg-white bg-opacity-10 text-white">
                <CardHeader>
                  <CardTitle>Instructors</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {instructors.map((instructor, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <Image
                          src={instructor.image}
                          alt={instructor.name}
                          width={60}
                          height={60}
                          className="rounded-full"
                        />
                        <div>
                          <h4 className="font-semibold">{instructor.name}</h4>
                          <p className="text-sm">{instructor.qualification}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="mt-12 flex justify-center space-x-4">
              <Link href={`/departments/${departmentName.toLowerCase()}/courses/${courseCode}/labs`} className="text-white hover:underline">
                Labs
              </Link>
              <Link href={`/departments/${departmentName.toLowerCase()}/courses/${courseCode}/achievements`} className="text-white hover:underline">
                Achievements
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

