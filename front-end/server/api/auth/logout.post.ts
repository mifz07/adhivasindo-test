export default defineEventHandler(async (event) => {

    const body = await readBody(event)
    const config = useRuntimeConfig()
    const baseURL = config.public.URL_API + '/api/v1'
    const cookie = parseCookies(event);
    const refreshToken = cookie.refreshToken;

    // Use native fetch instead of $fetch
    const response = await fetch(`${baseURL}/auth/logout`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${refreshToken}`,
        }
    });
    return response;
});
