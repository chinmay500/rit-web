import { CourseLabs } from '@/components/course-labs'

export default function CourseLabsPage() {
  // This data would typically come from an API or database
  const labsData = {
    departmentName: "Computer Science",
    courseName: "Introduction to Computer Science",
    courseCode: "CS101",
    labs: [
      {
        name: "Programming Fundamentals Lab",
        description: "Hands-on experience with basic programming concepts and syntax.",
        equipment: ["Personal computers", "Integrated Development Environments (IDEs)", "Version control systems"],
      },
      {
        name: "Algorithm Design Lab",
        description: "Practice designing and implementing efficient algorithms for various problems.",
        equipment: ["Whiteboard for algorithm design", "Performance analysis tools", "Algorithm visualization software"],
      },
      {
        name: "Data Structures Lab",
        description: "Implement and experiment with fundamental data structures.",
        equipment: ["Debugging tools", "Memory profilers", "Data structure visualization tools"],
      },
    ],
  }

  return <CourseLabs {...labsData} />
}

