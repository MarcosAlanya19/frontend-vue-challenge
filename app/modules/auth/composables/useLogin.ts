import { login, type ILoginPayload } from '../services/login.service'

export function useLogin() {
  const authStore = useAuthStore()
  const loading = ref(false)

  async function handle(payload: ILoginPayload): Promise<boolean> {
    loading.value = true
    try {
      const user = await login(payload)
      if (user) {
        authStore.setUser(user)
        return true
      }
      return false
    }
    finally {
      loading.value = false
    }
  }

  return { loading, handle }
}
