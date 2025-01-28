import { Suspense } from "react"
import dynamic from "next/dynamic"
import { Footer } from "@/components/footer"

const HeroSection = dynamic(() => import("@/components/hero-section"))
const AboutSection = dynamic(() => import("@/components/about-section"))
const AchievementsSection = dynamic(() => import("@/components/achivement-section"))
const ImportanceSection = dynamic(() => import("@/components/importance-section"))
const RecruitersSection = dynamic(() => import("@/components/recruiter-section"))
const TieUpSection = dynamic(() => import("@/components/tieup-section"))

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <Suspense fallback={<div>Loading...</div>}>
          <HeroSection />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <AboutSection />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <AchievementsSection />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <ImportanceSection />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <RecruitersSection />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <TieUpSection />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}

