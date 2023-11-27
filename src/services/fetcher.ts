export const fetcher = async (...args: string[]) => {
    const response = await fetch(args[0])
    return response.json()
}
