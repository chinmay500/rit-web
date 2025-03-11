import { departmentData } from "@/data/departments"

export function generateDepartmentResponse(department: string): string {
  const dept = department.toLowerCase()
  let deptKey: keyof typeof departmentData

  // Map common variations to department keys
  if (
    dept.includes("aiml") ||
    dept.includes("ai") ||
    dept.includes("ml") ||
    dept.includes("artificial") ||
    dept.includes("machine learning")
  ) {
    deptKey = "aiml"
  } else if (dept.includes("co") || dept.includes("computer")) {
    deptKey = "co"
  } else if (dept.includes("civil")) {
    deptKey = "civil"
  } else if (dept.includes("mech")) {
    deptKey = "mech"
  } else {
    return "I'm not sure which department you're asking about. We have four departments: AIML (Artificial Intelligence and Machine Learning), CO (Computer Engineering), Civil Engineering, and Mechanical Engineering. Which one would you like to know about?"
  }

  const deptInfo = departmentData[deptKey]

  return `
🎓 **${deptInfo.name}**

${deptInfo.description}

📚 **Course Details:**
• ${deptInfo.courses[0].name}
• Duration: ${deptInfo.courses[0].duration}
• Intake Capacity: ${deptInfo.courses[0].intake} students

✨ **Course Highlights:**
${deptInfo.courses[0].highlights.map((highlight) => `• ${highlight}`).join("\n")}

🔧 **Facilities:**
${deptInfo.facilities.map((facility) => `• ${facility}`).join("\n")}

🏆 **Key Achievements:**
${deptInfo.achievements.map((achievement) => `• ${achievement}`).join("\n")}

Would you like to know more about any specific aspect of the ${deptInfo.name} department?`
}

