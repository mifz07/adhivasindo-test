export default defineEventHandler(async (event) => {

  const body = await readBody(event)
  const config = useRuntimeConfig()
  const baseURL = config.public.URL_API + '/api/v1'
  const cookie = parseCookies(event);
  const accessToken = cookie.accessToken;
  
  // Use native fetch instead of $fetch
  const response = await fetch(`${baseURL}/content/${body.id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    }
  });

  return response;
});
