export async function fetchHymn(hymn: string) {
    const response = await fetch(`http://localhost:4000/api/hymn/${hymn}`);
    return await response.text();
}

export async function fetchHymnTitle(hymn: string) {
    const response = await fetch(`http://localhost:4000/api/hymntitle/${hymn}`);
    return await response.text();
}

export async function fetchReading(passage: string) {
    const response = await fetch(`http://localhost:4000/api/reading/${encodeURIComponent(passage)}`);
    return await response.text();
}

