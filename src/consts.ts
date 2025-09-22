// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.
export const SITE_TITLE = "Christian Krogh Nielsen";
export const SITE_DESCRIPTION =
    "Personal website of Christian Krogh Nielsen, Software Engineer and creator of the Discord bot Bento";
export const SITE_URL = "https://chrkn.dev";

// Author information
export const AUTHOR = {
    name: "Christian Krogh Nielsen",
    url: "https://chrkn.dev",
    email: "contact@chrkn.dev",
};

interface SocialMediaButton {
    colour: string;
    link: string;
    icon: string;
    js: boolean | undefined; // Optional property for JavaScript-based links
}

export const SOCIAL_MEDIA: SocialMediaButton[] = [
    {
        colour: "GitHub",
        link: "https://github.com/banner4422",
        icon: "GitHubIcon",
        js: false,
    },
    {
        colour: "LinkedIn",
        link: "https://www.linkedin.com/in/christian-krogh-nielsen-55152625a/",
        icon: "LinkedInIcon",
        js: false,
    },
    {
        colour: "Bluesky",
        link: "https://bsky.app/profile/chrkn.dk",
        icon: "BlueskyIcon",
        js: false,
    },
    {
        colour: "Discogs",
        link: "https://www.discogs.com/user/christiankn",
        icon: "DiscogsIcon",
        js: false,
    },
    {
        colour: "Instagram",
        link: "https://www.instagram.com/kraellle/",
        icon: "InstagramIcon",
        js: false,
    },
    {
        colour: "Tidal",
        link: "https://tidal.com/@bannertheworld",
        icon: "TidalIcon",
        js: false,
    },
    {
        colour: "LastFm",
        link: "https://www.last.fm/user/christiankn",
        icon: "LastfmIcon",
        js: false,
    },
    {
        colour: "Discord",
        link: "banner.",
        js: true,
        icon: "DiscordIcon",
    },
];

// SEO keywords
export const KEYWORDS = [
    "Christian Krogh Nielsen",
    "Student Software Engineer",
    "Student",
    "Software Engineer",
    "Web Development",
    "Copenhagen",
    "Denmark",
    "Bento",
    "Discord Bot",
    "TypeScript",
    "React",
    "Svelte",
    "Astro",
];
