import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AboutUs() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">RITP Lohegaon Pune</h1>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>About Our Institute</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg">
            The institute intends to achieve development of technical and non-technical skills in students by providing them best of quality education. We aim to prepare students for higher education as well as making them employable after successful completion of course. Our campus has well-developed laboratories, library, classrooms, hostel, canteen & playground with all amenities. RITP is one of the best diploma in engineering colleges (Polytechnic) in Pune.
          </p>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Our Vision</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg">To develop skilled professionals through technical education.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Our Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              <li>To excel a technical knowledge in a specific domain.</li>
              <li>To involve the faculties and students in Emerging Teaching-Learning practices.</li>
              <li>To prepare the students for higher studies in reputed institute.</li>
              <li>To provide skilled manpower to the society.</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

