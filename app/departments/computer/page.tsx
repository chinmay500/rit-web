import { DepartmentPage } from '@/components/department-page'

export default function ComputerDepartment() {
  return (
    <DepartmentPage
      hodImage="/placeholder.svg?height=300&width=250"
      hodName="Mr. Vinod B. Jadhav"
      hodQualifications="M.Tech in Computer Science and Engineering"
      departmentName="Computer Engineering"
      introduction="Welcome to the Computer Engineering Department. We are committed to nurturing skilled computer engineers ready to tackle the challenges of the digital age."
      vision="To be a center of excellence in computer engineering education, driving innovation in software development and digital technologies."
      mission="To provide a cutting-edge education in computer engineering, fostering creativity, problem-solving skills, and ethical use of technology."
      backgroundImage='/placeholder.svg?height=1080&width=1920'
      features={[
        "State-of-the-art computer labs with latest hardware and software",
        "Curriculum focused on emerging technologies like AI, ML, and IoT",
        "Industry partnerships for internships and projects",
        "Regular coding competitions and hackathons",
        "Emphasis on cybersecurity and ethical hacking"
      ]}
      courses={[
        { name: "Data Structures and Algorithms", code: "CS101" },
        { name: "Object-Oriented Programming", code: "CS201" },
        { name: "Database Management Systems", code: "CS301" },
        { name: "Web Technologies", code: "CS401" },
        { name: "Artificial Intelligence", code: "CS501" },
        { name: "Cloud Computing", code: "CS601" }
      ]}
    />
  )
}

