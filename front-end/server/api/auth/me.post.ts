export default defineEventHandler(async (event) => {

  const config = useRuntimeConfig()
  const baseURL = config.public.URL_API + '/api/v1'
  const cookie = parseCookies(event);
  const accessToken = cookie.accessToken;

  try {
    const response = await $fetch(`${baseURL}/auth/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      }
    })
    console.log('User data fetched:', response)
    return response

  } catch (error) {
    throw createError({ statusCode: 401 })
  }
})