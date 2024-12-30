import { SiteHeader } from "@/components/site-header"
import { Footer } from "@/components/footer"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="py-12">
          <div className="container">
            <div className="flex items-center justify-between mb-8">
              <Skeleton className="h-10 w-64" />
              <Skeleton className="h-10 w-32" />
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="aspect-video w-full" />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

