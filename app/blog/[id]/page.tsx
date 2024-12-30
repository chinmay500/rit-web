import { Footer } from "@/components/footer"
import { blogPosts } from "@/lib/blog-posts"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { notFound } from "next/navigation"

interface PageProps {
  params: {
    id: string
  }
}

export default function BlogPostPage({ params }: PageProps) {
  const post = blogPosts.find(p => p.id === params.id)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <article className="py-12">
          <div className="container max-w-4xl">
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            <div className="flex justify-between text-sm text-muted-foreground mb-6">
              <span>{post.author}</span>
              <span>{new Date(post.date).toLocaleDateString()}</span>
            </div>
            <div className="relative h-64 w-full mb-8">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div className="prose max-w-none">
              <p>{post.content}</p>
            </div>
            <div className="mt-8">
              <Button asChild>
                <Link href="/blog">Back to Blog</Link>
              </Button>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  )
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    id: post.id,
  }))
}

