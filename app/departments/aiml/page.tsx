import { DepartmentPage } from '@/components/department-page'

export default function AIMLDepartment() {
  return (
    <DepartmentPage
      hodImage="/vs.avif"
      hodName="Mr. Vikramsinh Saste"
      hodQualifications="Ph.D. in Artificial Intelligence"
      departmentName="Artificial Intelligence and Machine Learning"
      introduction="Welcome to the AI and Machine Learning Department at our institute. We are dedicated to pushing the boundaries of artificial intelligence and machine learning, preparing students for the exciting and rapidly evolving field of AI technology."
      vision="To be at the forefront of AI and ML education and research, driving technological innovations that benefit society."
      mission="To nurture skilled AI and ML professionals through a comprehensive curriculum, hands-on projects, and collaboration with industry leaders."
      features={[
        "Cutting-edge AI and ML laboratories",
        "Collaboration with leading AI research institutes",
        "Industry-sponsored projects",
        "Regular AI and ML workshops and conferences",
        "Focus on ethical AI development"
      ]}
      courses={[
        { name: "Introduction to Artificial Intelligence", code: "AI101" },
        { name: "Machine Learning Fundamentals", code: "ML201" },
        { name: "Deep Learning and Neural Networks", code: "DL301" },
        { name: "Natural Language Processing", code: "NLP401" },
        { name: "Computer Vision", code: "CV501" },
        { name: "Reinforcement Learning", code: "RL601" }
      ]}
    />
  )
}

