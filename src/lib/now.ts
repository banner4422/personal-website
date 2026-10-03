import { getCollection, type CollectionEntry } from "astro:content";

export function getStatusPreview(status: CollectionEntry<"now"> | undefined) {
    return (status?.body?.trim().split(/\n\s*\n/, 1)[0] ?? "")
        .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
        .replace(/[*_`#]/g, "")
        .replace(/\s+/g, " ")
        .slice(0, 240);
}

export async function getNowStatuses() {
    return (await getCollection("now"))
        .filter((status) => Boolean(status.body?.trim()))
        .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}
