export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const baseURL = config.public.URL_API + '/api/v1'
  const cookie = parseCookies(event)
  const accessToken = cookie.accessToken

  const response = await fetch(`${baseURL}/content`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'content-type': getRequestHeader(event, 'content-type') || '',
    },
    body: getRequestWebStream(event),
    duplex: 'half',
  } as any)

  return response
})