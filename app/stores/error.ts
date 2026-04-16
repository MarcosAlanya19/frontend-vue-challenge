import { defineStore } from 'pinia'

interface AppError {
  title: string
  message: string
}

export const useErrorStore = defineStore('error', () => {
  const error = ref<AppError | null>(null)

  function setError(err: AppError) {
    error.value = err
  }

  function clearError() {
    error.value = null
  }

  return { error, setError, clearError }
})
