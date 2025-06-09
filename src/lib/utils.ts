/*
 * Helper function to generate a class string from an array of classes
 * @param {Array<string | false | null | undefined>} classes - Array of class names
 * @return {string} - A string of class names joined by spaces
 */
export const classNames = (...classes: Array<string | false | null | undefined>): string =>
    classes.filter(Boolean).join(" ");

/*
 * Helper function to determine hover background class based on colour
 * @param {string} colour - The colour of the social media button
 * @return {string} - The corresponding hover background class
 */
export const getHoverBgClass = (colour: string): string => {
    if (colour === "Instagram") {
        return "instagram-gradient-button";
    }

    // Use a custom class that will be defined in global.css
    return `hover-bg-${colour}`;
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
