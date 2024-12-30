import { CourseAchievements } from '@/components/course-achievements'

export default function CourseAchievementsPage() {
  // This data would typically come from an API or database
  const achievementsData = {
    departmentName: "Computer Science",
    courseName: "Introduction to Computer Science",
    courseCode: "CS101",
    achievements: [
      {
        title: "High Student Satisfaction",
        description: "Consistently received over 90% positive feedback from students for the past 5 years.",
        date: "2023",
      },
      {
        title: "Curriculum Innovation Award",
        description: "Recognized for integrating real-world projects and industry partnerships into the course curriculum.",
        date: "September 15, 2022",
      },
      {
        title: "Alumni Success Stories",
        description: "Multiple alumni from this course have gone on to work at top tech companies and start successful startups.",
        date: "Ongoing",
      },
    ],
  }

  return <CourseAchievements {...achievementsData} />
}