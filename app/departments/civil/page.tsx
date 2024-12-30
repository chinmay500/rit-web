import { DepartmentPage } from '@/components/department-page'

export default function CivilDepartment() {
  return (
    <DepartmentPage
      hodImage="/sk.avif"
      hodName="Mrs. Sonali Kankriya"
      hodQualifications="Ph.D. in Structural Engineering"
      departmentName="Civil Engineering"
      introduction="Welcome to the Civil Engineering Department. We are dedicated to educating future civil engineers who will shape the infrastructure of tomorrow."
      vision="To be a premier institution for civil engineering education, fostering sustainable and innovative infrastructure solutions."
      mission="To provide a comprehensive education in civil engineering principles and practices, emphasizing sustainable design and construction methodologies."
      backgroundImage='/placeholder.svg?height=1080&width=1920'
      features={[
        "Advanced structural and environmental engineering labs",
        "Focus on sustainable and green building technologies",
        "Partnerships with leading construction firms",
        "Emphasis on project-based learning",
        "Regular field visits and practical training sessions"
      ]}
      courses={[
        { name: "Structural Analysis", code: "CE101" },
        { name: "Geotechnical Engineering", code: "CE201" },
        { name: "Transportation Engineering", code: "CE301" },
        { name: "Water Resources Engineering", code: "CE401" },
        { name: "Environmental Engineering", code: "CE501" },
        { name: "Construction Management", code: "CE601" }
      ]}
    />
  )
}

