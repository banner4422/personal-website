import { persistentAtom } from "@nanostores/persistent";

export const selectedCategory = persistentAtom<string>("selectedCategory", "all", {
    encode: JSON.stringify,
    decode: JSON.parse,
});

export const sortOrder = persistentAtom<string>("sortOrder", "newest", {
    encode: JSON.stringify,
    decode: JSON.parse,
});

export const searchTerm = persistentAtom<string>("searchTerm", "", {
    encode: JSON.stringify,
    decode: JSON.parse,
});
