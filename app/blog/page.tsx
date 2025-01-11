import { Footer } from "@/components/footer"
import { BlogPostCard } from "@/components/blog-post-card"
import { blogPosts } from "@/lib/blog-posts"

export default function BlogPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <section className="py-12">
          <div className="container">
            <h1 className="text-4xl font-bold mb-8 text-center">Blog</h1>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {blogPosts.map((post) => (
                <BlogPostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

