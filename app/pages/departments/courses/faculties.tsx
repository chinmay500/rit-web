import { CourseFaculties } from '@/components/course-faculties'

export default function CourseFacultiesPage() {
  // This data would typically come from an API or database
  const facultiesData = {
    departmentName: "Computer Science",
    courseName: "Introduction to Computer Science",
    courseCode: "CS101",
    faculties: [
      {
        name: "Dr. Alan Turing",
        position: "Professor",
        qualifications: "Ph.D. in Computer Science",
        image: "/placeholder.svg?height=200&width=200",
      },
      {
        name: "Prof. Grace Hopper",
        position: "Associate Professor",
        qualifications: "Ph.D. in Mathematics",
        image: "/placeholder.svg?height=200&width=200",
      },
      {
        name: "Dr. Ada Lovelace",
        position: "Assistant Professor",
        qualifications: "Ph.D. in Computer Engineering",
        image: "/placeholder.svg?height=200&width=200",
      },
    ],
  }

  return <CourseFaculties {...facultiesData} />
}

