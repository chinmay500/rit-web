import { CourseLayout } from '@/components/course-layout'

export default function CoursePage() {
  // This data would typically come from an API or database
  const courseData = {
    courseImage: "/placeholder.svg?height=200&width=300",
    courseName: "Introduction to Computer Science",
    courseCode: "CS101",
    courseDescription: "This course provides a comprehensive introduction to the fundamental concepts of computer science, covering topics such as programming basics, algorithms, and data structures.",
    duration: "1 semester",
    credits: 3,
    departmentName: "Computer Science",
    backgroundImage: "/placeholder.svg?height=1080&width=1920",
    syllabus: [
      "Introduction to programming concepts",
      "Basic data types and control structures",
      "Functions and modular programming",
      "Object-oriented programming basics",
      "Introduction to algorithms and problem-solving",
      "Basic data structures (arrays, lists, stacks, queues)",
    ],
    instructors: [
      {
        name: "Dr. Jane Smith",
        image: "/placeholder.svg?height=60&width=60",
        qualification: "Ph.D. in Computer Science",
      },
      {
        name: "Prof. John Doe",
        image: "/placeholder.svg?height=60&width=60",
        qualification: "M.Sc. in Software Engineering",
      },
    ],
  }

  return <CourseLayout {...courseData} />
}

