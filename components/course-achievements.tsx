import Link from 'next/link'
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

interface Achievement {
  title: string
  description: string
  date: string
}

interface CourseAchievementsProps {
  departmentName: string
  courseName: string
  courseCode: string
  achievements: Achievement[]
}

export function CourseAchievements({ departmentName, courseName, courseCode, achievements }: CourseAchievementsProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Link href={`/departments/${departmentName.toLowerCase()}/courses/${courseCode}`} passHref>
          <Button variant="outline" className="mb-4">
            Back to Course
          </Button>
        </Link>
        <h1 className="text-4xl font-bold mb-6 text-center">{courseName} Achievements</h1>
        <div className="space-y-6">
          {achievements.map((achievement, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{achievement.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-2">{achievement.description}</p>
                <p className="text-sm text-gray-500">{achievement.date}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}

