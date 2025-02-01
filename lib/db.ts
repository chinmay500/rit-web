import { readFile, writeFile } from "fs/promises"
import path from "path"

const USERS_FILE = path.join(process.cwd(), "data", "users.json")
const VERIFICATION_CODES_FILE = path.join(process.cwd(), "data", "verification_codes.json")

interface User {
  id: number
  email: string
  name: string
  password: string
}

interface VerificationCode {
  email: string
  code: string
  expiresAt: number
}

async function readJSONFile<T>(filePath: string): Promise<T> {
  const data = await readFile(filePath, "utf-8")
  return JSON.parse(data)
}

async function writeJSONFile<T>(filePath: string, data: T): Promise<void> {
  await writeFile(filePath, JSON.stringify(data, null, 2), "utf-8")
}

export async function getUserByEmail(email: string): Promise<User | undefined> {
  const users = await readJSONFile<User[]>(USERS_FILE)
  return users.find((user) => user.email === email)
}

export async function storeVerificationCode(email: string, code: string): Promise<void> {
  const verificationCodes = await readJSONFile<VerificationCode[]>(VERIFICATION_CODES_FILE)
  const expiresAt = Date.now() + 15 * 60 * 1000 // 15 minutes expiration

  const existingIndex = verificationCodes.findIndex((vc) => vc.email === email)
  if (existingIndex !== -1) {
    verificationCodes[existingIndex] = { email, code, expiresAt }
  } else {
    verificationCodes.push({ email, code, expiresAt })
  }

  await writeJSONFile(VERIFICATION_CODES_FILE, verificationCodes)
}

export async function verifyCode(email: string, code: string): Promise<boolean> {
  const verificationCodes = await readJSONFile<VerificationCode[]>(VERIFICATION_CODES_FILE)
  const verificationCode = verificationCodes.find((vc) => vc.email === email && vc.code === code)

  if (!verificationCode || verificationCode.expiresAt < Date.now()) {
    return false
  }

  // Remove the used verification code
  const updatedCodes = verificationCodes.filter((vc) => vc.email !== email || vc.code !== code)
  await writeJSONFile(VERIFICATION_CODES_FILE, updatedCodes)

  return true
}

export async function updateUserPassword(email: string, hashedPassword: string): Promise<void> {
  const users = await readJSONFile<User[]>(USERS_FILE)
  const userIndex = users.findIndex((user) => user.email === email)

  if (userIndex !== -1) {
    users[userIndex].password = hashedPassword
    await writeJSONFile(USERS_FILE, users)
  } else {
    throw new Error("User not found")
  }
}

