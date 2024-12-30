import Image from 'next/image'
import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

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
  backgroundImage: string
  courses: Course[]
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
  backgroundImage,
  courses
}: DepartmentPageProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <div className="relative">
          <Image
            src={backgroundImage}
            alt={`${departmentName} background`}
            fill
            style={{ objectFit: "cover" }}
            quality={100}
            priority
            className="blur-sm"
          />
          <div className="absolute inset-0 bg-black bg-opacity-70" />
          <div className="relative z-10 container mx-auto px-4 py-12 text-white">
            <h1 className="text-4xl font-bold mb-6 text-center">{departmentName} Department</h1>
            <p className="text-lg text-center mb-8 max-w-3xl mx-auto">{introduction}</p>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-white bg-opacity-10 text-white">
                <CardHeader>
                  <CardTitle className="text-center">Head of Department</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  <Image
                    src={hodImage}
                    alt={hodName}
                    width={200}
                    height={200}
                    className="rounded-full mb-4"
                  />
                  <h2 className="text-2xl font-semibold mb-1">{hodName}</h2>
                  <p className="text-sm mb-4">{hodQualifications}</p>
                  <p className="text-sm text-center">
                    Welcome to the {departmentName} Department. Our goal is to provide students with a strong foundation in {departmentName.toLowerCase()} principles and prepare them for successful careers in the industry.
                  </p>
                </CardContent>
              </Card>
              <div className="space-y-6">
                <Card className="bg-white bg-opacity-10 text-white">
                  <CardHeader>
                    <CardTitle>Vision</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{vision}</p>
                  </CardContent>
                </Card>
                <Card className="bg-white bg-opacity-10 text-white">
                  <CardHeader>
                    <CardTitle>Mission</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{mission}</p>
                  </CardContent>
                </Card>
              </div>
            </div>
            <Card className="mt-8 bg-white bg-opacity-10 text-white">
              <CardHeader>
                <CardTitle>Key Features</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5">
                  {features.map((feature, index) => (
                    <li key={index} className="mb-2">{feature}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <div className="mt-12">
              <h2 className="text-3xl font-bold mb-6 text-center">Our Courses</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                  <Link key={course.code} href={`/departments/${departmentName.toLowerCase()}/courses/${course.code}`}>
                    <Card className="bg-white bg-opacity-10 text-white hover:bg-opacity-20 transition-all cursor-pointer">
                      <CardHeader>
                        <CardTitle>{course.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>Course Code: {course.code}</p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

