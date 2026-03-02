import { appendHeader } from 'h3';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const baseURL = config.public.URL_API + '/api/v1'

  const cookie = parseCookies(event);
  const refreshToken = cookie.refreshToken;

  try {
    const response = await $fetch.raw(`${baseURL}/auth/refresh-token`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      }
    });

    const cookies = response.headers.getSetCookie?.();

    if (cookies) {
      cookies.forEach((cookie) => {
        appendHeader(event, 'set-cookie', cookie);
      });
    }

    return response._data;
  } catch (error) {
    console.error(error);
  }
});