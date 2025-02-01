import type { NextApiRequest, NextApiResponse } from "next"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import fs from "fs"
import path from "path"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

interface User {
  id: number
  email: string
  name: string
  password: string
  idNumber: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    if (req.body.action === "signin") {
      return handleSignIn(req, res)
    } else if (req.body.action === "signup") {
      return handleSignUp(req, res)
    }
  }

  res.setHeader("Allow", ["POST"])
  res.status(405).end(`Method ${req.method} Not Allowed`)
}

async function handleSignIn(req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = req.body

  const users = getUsers()
  const user = users.find((u: User) => u.email === email)

  if (!user) {
    return res.status(400).json({ message: "Invalid email or password" })
  }

  const passwordMatch = await bcrypt.compare(password, user.password)

  if (!passwordMatch) {
    return res.status(400).json({ message: "Invalid email or password" })
  }

  const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: "1h" })

  res.status(200).json({ token, user: { id: user.id, name: user.name, email: user.email, idNumber: user.idNumber } })
}

async function handleSignUp(req: NextApiRequest, res: NextApiResponse) {
  const { name, email, password, idNumber } = req.body

  const users = getUsers()

  if (users.some((u: User) => u.email === email)) {
    return res.status(400).json({ message: "Email already in use" })
  }

  if (users.some((u: User) => u.idNumber === idNumber)) {
    return res.status(400).json({ message: "ID Number already in use" })
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const newUser: User = {
    id: users.length + 1,
    name,
    email,
    password: hashedPassword,
    idNumber,
  }

  users.push(newUser)
  saveUsers(users)

  const token = jwt.sign({ userId: newUser.id, email: newUser.email }, JWT_SECRET, { expiresIn: "1h" })

  res
    .status(201)
    .json({ token, user: { id: newUser.id, name: newUser.name, email: newUser.email, idNumber: newUser.idNumber } })
}

function getUsers(): User[] {
  const usersFilePath = path.join(process.cwd(), "data", "users.json")
  const usersData = fs.readFileSync(usersFilePath, "utf8")
  return JSON.parse(usersData)
}

function saveUsers(users: User[]) {
  const usersFilePath = path.join(process.cwd(), "data", "users.json")
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2))
}

