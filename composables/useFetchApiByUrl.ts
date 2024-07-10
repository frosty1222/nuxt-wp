export default async (url: string) => {
    try {
        const res = await useFetch(url);

        return res || null;
    } catch (error) {
        return error;
    }
};