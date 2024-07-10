export default async (url: string, params?: Record<string, string>) => {
    const config = useRuntimeConfig();
    try {
        const res = await useFetch(config.public.baseURL + url, {
            query: params,
        });

        return res?.data?.value || null;
    } catch (error) {
        return error;
    }
};