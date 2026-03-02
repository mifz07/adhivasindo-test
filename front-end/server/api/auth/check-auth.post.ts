export default defineEventHandler(async (event) => {
    const cookie = parseCookies(event);
    const accessToken = cookie.accessToken;
    try {
        const config = useRuntimeConfig(); 
        const baseURL = config.public.URL_API + '/api/v1';
        const response = await fetch(`${baseURL}/auth/check-auth`, {
        method: 'GET',
        headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
        });
        
        const data = await response.json();
        return data;
    } catch (error) {
        return { status: false, message: 'Failed to fetch health' };
    }
});
