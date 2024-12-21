import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";
//import { Metadata, Viewport } from "next";
import Head from "next/head";
import NavBar from "../components/NavBar";
import Spotify from "../components/Spotify";

/*
export const siteConfig = {
	name: "Bento",
	url: "https://bentobot.xyz",
	ogImage: "https://bentobot.xyz/bento_discord.webp",
	description:
		"Bento is a multi-purpose Discord bot with a lot of fun features such as custom profiles, tags and last.fm",
	links: {
		github: "https://github.com/thebentobot",
	},
};

export type SiteConfig = typeof siteConfig;

export const metadata: Metadata = {
	title: {
		default: siteConfig.name,
		template: `%s - ${siteConfig.name}`,
	},
	metadataBase: new URL(siteConfig.url),
	description: siteConfig.description,
	keywords: ["discord", "bot", "bento", "bento bot", "open-source"],
	authors: [
		{
			name: "Christian Krogh Nielsen",
			url: "https://chrkn.dev",
		},
	],
	creator: "Christian Krogh Nielsen",
	openGraph: {
		type: "website",
		locale: "en_GB",
		url: siteConfig.url,
		title: siteConfig.name,
		description: siteConfig.description,
		siteName: siteConfig.name,
		images: [
			{
				url: siteConfig.ogImage,
				width: 128,
				height: 128,
				alt: siteConfig.name,
			},
		],
	},
	icons: {
		icon: "/favicon.ico",
		shortcut: "/favicon-16x16.png",
		apple: "/apple-touch-icon.png",
	},
	manifest: `${siteConfig.url}/manifest.webmanifest`,
};

export const viewport: Viewport = {
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "white" },
		{ media: "(prefers-color-scheme: dark)", color: "black" },
	],
};
*/

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head />
            <Head>
                <link href="favicon.ico" rel="shortcut icon" as="" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
                <link href="site.webmanifest" rel="manifest" />
                <link rel="preload" as="image" href="/avatar.jpg" />
                <meta
                    content="max-snippet:-1, max-image-preview:large, max-video-preview:-1"
                    name="robots"
                />
            </Head>
			<body className={`${inter.className} bg-gray-50 dark:bg-zinc-900`}>
				<ThemeProvider defaultTheme="system" attribute="class" enableSystem>
					<NavBar/>
                    <main className="flex flex-col justify-center px-8">
						{children}
					</main>
					<footer className="flex flex-col justify-center items-start max-w-2xl mx-auto w-full dark:opacity-50">
                        <hr className="w-full border-1 border-gray-200 dark:border-gray-800 mb-4" />
                        <Spotify />
					</footer>
				</ThemeProvider>
			</body>
		</html>
	);
}
