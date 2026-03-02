export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const config = useRuntimeConfig(); 
  const baseURL = config.public.URL_API + '/api/v1'; 

    const response = await $fetch.raw(`${baseURL}/auth/login`, {
      method: 'POST',
      body: body,
      credentials: 'include'
    });

    const setCookieHeader = response.headers.get('set-cookie') || '';
    const cookies = setCookieHeader.split(', '); // pisah per cookie

    event.res.setHeader('Set-Cookie', cookies);

    return await response._data;
});
