import type { NextApiRequest, NextApiResponse } from "next"
import jwt from "jsonwebtoken"
import fs from "fs"
import path from "path"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

interface BlogPost {
  id: number
  title: string
  content: string
  author: string
  date: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const token = req.headers.authorization?.split(" ")[1]

    if (!token) {
      return res.status(401).json({ message: "No token provided" })
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { userId: number; email: string }

      const { title, content } = req.body

      const blogPosts = getBlogPosts()
      const newPost: BlogPost = {
        id: blogPosts.length + 1,
        title,
        content,
        author: decoded.email,
        date: new Date().toISOString(),
      }

      blogPosts.push(newPost)
      saveBlogPosts(blogPosts)

      res.status(201).json(newPost)
    } catch (error) {
        console.log(error)
      res.status(401).json({ message: "Invalid token" })
    }
  } else if (req.method === "GET") {
    const blogPosts = getBlogPosts()
    res.status(200).json(blogPosts)
  } else {
    res.setHeader("Allow", ["POST", "GET"])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

function getBlogPosts(): BlogPost[] {
  const blogPostsFilePath = path.join(process.cwd(), "data", "blogPosts.json")
  if (!fs.existsSync(blogPostsFilePath)) {
    fs.writeFileSync(blogPostsFilePath, "[]")
  }
  const blogPostsData = fs.readFileSync(blogPostsFilePath, "utf8")
  return JSON.parse(blogPostsData)
}

function saveBlogPosts(blogPosts: BlogPost[]) {
  const blogPostsFilePath = path.join(process.cwd(), "data", "blogPosts.json")
  fs.writeFileSync(blogPostsFilePath, JSON.stringify(blogPosts, null, 2))
}

