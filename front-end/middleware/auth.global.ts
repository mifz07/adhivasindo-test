import { useProfileStore } from '~/store/profile'

export default defineNuxtRouteMiddleware(async (to) => {
  const publicPages = ['/login', '/register', '/404']
  const isPublic = publicPages.some(p => to.path.startsWith(p))
  const accessToken = process.server ? useCookie('accessToken').value : null
  const { $fetchAuth } = useNuxtApp()
  const profileStore = useProfileStore()
  
  if (process.server) {
    if (isPublic && accessToken) return navigateTo('/')
    if (!isPublic && !accessToken) return navigateTo('/login')
    return
  }
  try {
    const authCheck = await $fetchAuth('/api/auth/check-auth', { method: 'POST' })

    if (!authCheck.status || authCheck.code === 401 || authCheck.data?.code === 401) {
      if (!isPublic) return navigateTo('/login')
      return
    }

    if (isPublic) return navigateTo('/')

  } catch (error) {
    console.error('Auth middleware error:', error)
    if (!isPublic) return navigateTo('/login')
  }
})
