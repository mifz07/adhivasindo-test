export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const baseURL = config.public.URL_API + '/api/v1'
  const cookie = parseCookies(event)
  const accessToken = cookie.accessToken
  const id = getRouterParam(event, 'id')

  const response = await fetch(`${baseURL}/content/${id}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'content-type': getRequestHeader(event, 'content-type') || '',
    },
    body: getRequestWebStream(event),
    duplex: 'half',
  } as any)

  return response
})