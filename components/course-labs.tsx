import Link from 'next/link'
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

interface Lab {
  name: string
  description: string
  equipment: string[]
}

interface CourseLabsProps {
  departmentName: string
  courseName: string
  courseCode: string
  labs: Lab[]
}

export function CourseLabs({ departmentName, courseName, courseCode, labs }: CourseLabsProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Link href={`/departments/${departmentName.toLowerCase()}/courses/${courseCode}`} passHref>
          <Button variant="outline" className="mb-4">
            Back to Course
          </Button>
        </Link>
        <h1 className="text-4xl font-bold mb-6 text-center">{courseName} Labs</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {labs.map((lab, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{lab.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">{lab.description}</p>
                <h4 className="font-semibold mb-2">Equipment:</h4>
                <ul className="list-disc pl-5">
                  {lab.equipment.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}

