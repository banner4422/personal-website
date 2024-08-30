import { motion } from "framer-motion";
import Head from "next/head";
//import { footerAnimation } from "../lib/animationVariants";
import NavBar from "./NavBar";
import Spotify from "./Spotify";
import Weather from "./Weather";

interface props {
    switchLoad: boolean;
    shouldReduceMotion: boolean;
    resolvedTheme: string;
    setThemeExtended: Function;
    children: React.ReactNode;
}

export default function Container({ switchLoad, shouldReduceMotion, resolvedTheme, setThemeExtended, children }: props) {
    return (
        <div className="bg-gray-50 dark:bg-zinc-900">
            <Head>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <NavBar resolvedTheme={resolvedTheme!} setThemeExtended={setThemeExtended} shouldReduceMotion={shouldReduceMotion!} switchLoad={switchLoad} />
            <main className="flex flex-col justify-center px-8">
                {children}
            <motion.footer 
                initial="hidden" 
                animate="show" 
                className="flex flex-col justify-center items-start max-w-2xl mx-auto w-full dark:opacity-50">
                <hr className="w-full border-1 border-gray-200 dark:border-gray-800 mb-4" />
                <Spotify />
                <Weather />
            </motion.footer>
            </main>
        </div>
    )
}