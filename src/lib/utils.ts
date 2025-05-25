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
