import { DepartmentPage } from '@/components/department-page'

export default function DepartmentPageWrapper() {
  // This data would typically come from an API or database
  const departmentData = {
    hodImage: "/placeholder.svg?height=300&width=250",
    hodName: "Dr. John Doe",
    hodQualifications: "Ph.D. in Computer Science",
    departmentName: "Computer Science",
    introduction: "Welcome to the Computer Science Department, where innovation meets education.",
    vision: "To be a leading center of excellence in computer science education and research.",
    mission: "To provide high-quality education, conduct cutting-edge research, and foster innovation in the field of computer science.",
    features: [
      "State-of-the-art computer labs",
      "Experienced faculty members",
      "Industry-aligned curriculum",
      "Research opportunities for students",
    ],
    backgroundImage: "/placeholder.svg?height=1080&width=1920",
    courses: [
      { name: "Introduction to Computer Science", code: "CS101" },
      { name: "Data Structures and Algorithms", code: "CS201" },
      { name: "Database Management Systems", code: "CS301" },
      { name: "Artificial Intelligence", code: "CS401" },
      { name: "Web Development", code: "CS501" },
      { name: "Cybersecurity", code: "CS601" },
    ]
  }

  return <DepartmentPage {...departmentData} />
}

