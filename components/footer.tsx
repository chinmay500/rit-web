import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:underline">Home</Link></li>
              <li><Link href="/about" className="hover:underline">About Us</Link></li>
              <li><Link href="/admissions" className="hover:underline">Admissions</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p>S. No. 35/4, Vadgaon-Shinde Road, Lohagaon, Pune-411047.</p>
            <p>Tel.9607956658/59/60</p>
            <p>Email: kesadmin@ritppune.com</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/vj565656" className="hover:text-gray-300">Facebook</a>
              <a href="https://www.instagram.com/ritppune_official?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" className="hover:text-gray-300">Instagram</a>
              <a href="https://www.linkedin.com/in/rajarambapu-institute-of-technology-polytechnic-lohegaon-5a4b24294/" className="hover:text-gray-300">LinkedIn</a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p>&copy; 2023 Your College Name. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

