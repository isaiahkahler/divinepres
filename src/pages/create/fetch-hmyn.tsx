export async function fetchHymn(hymn: string) {
    const response = await fetch(`/api/hymn/${hymn}`);
    return await response.text();
}

export async function fetchHymnTitle(hymn: string) {
    const response = await fetch(`/api/hymntitle/${hymn}`);
    return await response.text();
}