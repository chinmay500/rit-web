import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

interface Faculty {
  name: string
  position: string
  qualifications: string
  image: string
}

interface CourseFacultiesProps {
  departmentName: string
  courseName: string
  courseCode: string
  faculties: Faculty[]
}

export function CourseFaculties({ departmentName, courseName, courseCode, faculties }: CourseFacultiesProps) {
  return (
    <div className="min-h-screen flex flex-col">
    
      <main className="flex-grow container mx-auto px-4 py-8">
        <Link href={`/departments/${departmentName.toLowerCase()}/courses/${courseCode}`} passHref>
          <Button variant="outline" className="mb-4">
            Back to Course
          </Button>
        </Link>
        <h1 className="text-4xl font-bold mb-6 text-center">{courseName} Faculty</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {faculties.map((faculty, index) => (
            <Card key={index}>
              <CardHeader>
                <Image
                  src={faculty.image}
                  alt={faculty.name}
                  width={200}
                  height={200}
                  className="rounded-full mx-auto mb-4"
                />
                <CardTitle className="text-center">{faculty.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center mb-2">{faculty.position}</p>
                <p className="text-center text-sm">{faculty.qualifications}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}

