export async function fetchHymn(hymn: string) {
    const response = await fetch(`/api/hymn/${hymn}`);
    return await response.text();
}
