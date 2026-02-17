/*
 * Helper function to generate a class string from an array of classes
 * @param {Array<string | false | null | undefined>} classes - Array of class names
 * @return {string} - A string of class names joined by spaces
 */
export const classNames = (...classes: Array<string | false | null | undefined>): string =>
    classes.filter(Boolean).join(" ");

/*
 * Returns the hover class and optional inline style for a social media button.
 * Instagram uses a gradient pseudo-element; all others use a single CSS class
 * driven by a --social-hover-color custom property set via inline style.
 * The actual color values live in :root in global.css (single source of truth).
 */
export const getSocialHover = (
    colour: string
): { className: string; style: string | undefined } => {
    if (colour === "Instagram") {
        return { className: "instagram-gradient-button", style: undefined };
    }

    return {
        className: "social-hover",
        style: `--social-hover-color: var(--color-${colour})`,
    };
};

/*
 * Format a date for article display (weekday, month, day of the month, year)
 * @param {Date} date - The date to format
 * @return {string} - The formatted date string (e.g., "Monday, January 1, 2023")
 */
export const formatArticleDate = (date: Date): string =>
    new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
    }).format(date);

/*
 * Format a date for post display (date, month in short, and year)
 * @param {Date} date - The date to format
 * @return {string} - The formatted date string (e.g., "1 Jan 2023")
 */
export const formatPostDate = (date: Date): string =>
    new Intl.DateTimeFormat("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
    }).format(date);
