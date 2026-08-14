import { hashPassword } from './server'

const password = process.argv[2]
if (!password) {
  throw new Error('Usage: npm run cms:hash-password -- "a strong password"')
}

console.log(hashPassword(password))
