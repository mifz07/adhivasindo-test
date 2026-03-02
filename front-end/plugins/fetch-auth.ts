import { defineNuxtPlugin } from '#app'
import { useAuthStore } from '~/store/auth'

interface ApiResponse<T = any> {
  status: boolean
  message: string
  statusCode: number
  data: T
}

export default defineNuxtPlugin(() => {

  const authStore = useAuthStore()

  const fetchAuth = async <T = any>(
    url: string,
    options: any = {}
  ): Promise<{
    status: boolean
    code: number
    data: T | null
    message: string | null
  }> => {
    if (!process.client) {
      return {
        status: false,
        code: 0,
        data: null,
        message: 'Client-only fetch',
      }
    }

    const isFormData = options.body instanceof FormData

    const headers = {
      ...(options.headers || {}),
      ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
    }

    try {
      let response = await $fetch.raw<ApiResponse>(url, {
        ...options,
        headers,
        credentials: 'include',
        ignoreResponseError: true,
        server: false, 
      })

      if ((response._data as any)?.statusCode === 401) {
        const refresh = await $fetch.raw('/api/auth/refresh-token', {
          method: 'POST',
          credentials: 'include',
          ignoreResponseError: true,
          server: false, 
        })

        if ((refresh._data as any)?.statusCode !== 200) {
          return {
            status: false,
            code: 401,
            data: null,
            message: 'Unauthorized',
          }
        }

        response = await $fetch.raw<ApiResponse>(url, {
          ...options,
          headers,
          credentials: 'include',
          ignoreResponseError: true,
          server: false, 
        })

        authStore.setUser({
          userId: response._data?.data.user_id,
          role: response._data?.data.role,
        })
      }

      return {
        status: response.status >= 200 && response.status < 300,
        code: response.status,
        data: (response._data as T) ?? null,
        message: (response._data as any)?.message ?? null,
      }
    } catch (error: any) {
      return {
        status: false,
        code: 500,
        data: null,
        message: error?.message ?? 'Fetch error',
      }
    }
  }

  return {
    provide: {
      fetchAuth,
    },
  }
})
