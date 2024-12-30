import Image from 'next/image'
import { Footer } from "@/components/footer"
import { AchievementSlideshow } from "@/components/achievement-slideshow"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      
      <main className="flex-1">
        <section className="relative">
          {/* Background image */}
          <div className="absolute inset-0 z-[-2]">
            <Image
              src="/clg.jpg"
              alt="College campus background"
              fill
              style={{ objectFit: 'cover' }}
              quality={100}
              priority
            />
          </div>
          
          <div className="container relative z-10 min-h-[600px] flex items-center">
            <div className="w-full max-w-3xl mx-auto py-12">
              <div className="flex flex-col justify-center text-white space-y-8">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-center">
                  Start your career with a new way of learning
                </h1>
              </div>
            </div>
          </div>
        </section>

        {/* About Institute Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">About Our Institute</h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-lg mb-4">
                The institute intends to achieve development of technical and non-technical skills in students by providing them best of quality education. The institute aims to prepare students for higher education as well as making them employable after successful completion of course. The institute campus has well developed laboratories, library, class rooms, hostel, canteen & play ground with all amenities. It is one of the best diploma in engineering colleges(Polytechnic) in Pune.
                </p>
              </div>
              <div className="relative h-64 md:h-full">
                <Image
                  src="/clg.jpg"
                  alt="Institute building"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Student Achievements Section */}
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">Student Achievements</h2>
            <AchievementSlideshow />
          </div>
        </section>

        {/* Importance of Technical Institution Section */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">Importance of Technical Education</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Innovation Drivers</h3>
                <p>Technical institutions are at the forefront of driving innovation and technological advancements.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Skill Development</h3>
                <p>We focus on developing practical skills that are crucial in today&apos;s rapidly evolving job market.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Economic Growth</h3>
                <p>Technical education plays a vital role in fostering economic growth and industrial development.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Recruiters Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">Our Recruiters</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { name: '3S Properties', logo: '/cp1.png' },
                { name: 'Hyundai', logo: '/cp2.png' },
                { name: 'Joy e-bike', logo: '/cp3.png' },
                { name: 'Rahitech', logo: '/cp4.png' },
              ].map((company) => (
                <div key={company.name} className="bg-gray-100 h-24 flex items-center justify-center rounded-lg p-4">
                  <Image
                    src={company.logo}
                    alt={`${company.name} logo`}
                    width={120}
                    height={60}
                    style={{ objectFit: 'contain' }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Tie-up Section */}
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">We are Tie-Up With</h2>
            <div className="flex flex-wrap justify-center items-center gap-8">
              {[
                { name: 't1', logo: '/t1.png' },
                { name: 't2', logo: '/t2.png' },
                { name: 't3', logo: '/t3.png' },
                { name: 't4', logo: '/t4.png' },
                { name: 'joy ebike', logo: '/cp3.png' },
              ].map((partner) => (
                <div key={partner.name} className="flex items-center justify-center">
                  <Image
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    width={200}
                    height={100}
                    style={{ objectFit: 'contain' }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

