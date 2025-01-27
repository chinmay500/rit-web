import { DepartmentPage } from '@/components/department-page'

export default function MechanicalDepartment() {
  return (
    <DepartmentPage
      hodImage="/as.avif"
      hodName="Mr. Ajinkya A. Satam"
      hodQualifications="M.Tech in Mechanical Engineering"
      departmentName="Mechanical Engineering"
      introduction="Welcome to the Mechanical Engineering Department. We are committed to providing a comprehensive education in mechanical systems, design, and manufacturing processes."
      vision="To be a leading center for mechanical engineering education and research, fostering innovation and sustainable solutions."
      mission="To educate and train skilled mechanical engineers capable of addressing complex industrial challenges and contributing to technological advancements."
      features={[
        "State-of-the-art manufacturing and design labs",
        "Industry-aligned curriculum with focus on practical skills",
        "Collaboration with leading mechanical industries",
        "Research opportunities in emerging areas like robotics and sustainable energy",
        "Regular workshops and seminars by industry experts"
      ]}
      courses={[
        { name: "Manufacturing Processes", code: "ME101" },
        { name: "Thermodynamics", code: "ME201" },
        { name: "Machine Design", code: "ME301" },
        { name: "Fluid Mechanics", code: "ME401" },
        { name: "Robotics and Automation", code: "ME501" },
        { name: "CAD/CAM", code: "ME601" }
      ]}
    />
  )
}

