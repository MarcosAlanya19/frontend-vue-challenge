import { findUserByCredentials } from './mock-db'

export interface ILoginPayload {
  email: string
  password: string
}

export interface AuthUser {
  email: string
  fullName: string
}

export async function login(payload: ILoginPayload): Promise<AuthUser | null> {
  const user = findUserByCredentials(payload.email, payload.password)
  if (!user) return null
  const { password: _pw, ...authUser } = user
  return { email: authUser.email, fullName: authUser.fullName }
}
