'use server'

import { z } from 'zod'

const formSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  mobileNo: z.string().regex(/^[0-9]{10}$/),
})

type FormValues = z.infer<typeof formSchema>

export async function submitAdmissionForm(formData: FormValues) {
  const result = formSchema.safeParse(formData)

  if (!result.success) {
    throw new Error('Invalid form data')
  }

  // In a real application, you would send an email here.
  // For this example, we'll just log the form data.
  console.log('Form submitted:', result.data)

  // Simulate an API delay
  await new Promise(resolve => setTimeout(resolve, 1000))

  // Simulate sending an email
  const emailContent = `
    New Admission Form Submission:
    Full Name: ${result.data.fullName}
    Email: ${result.data.email}
    Mobile Number: ${result.data.mobileNo}
  `

  console.log('Email sent:', emailContent)

  return { success: true }
}

