import { Switch } from "@headlessui/react";
import { motion } from "framer-motion";
import { darkModeSwitchAnimation } from "../lib/animationVariants";

interface props {
    switchLoad: boolean;
    shouldReduceMotion: boolean;
    resolvedTheme: string;
    setThemeExtended: Function;
}

export default function NavBar({ switchLoad, shouldReduceMotion, resolvedTheme, setThemeExtended }: props) {
    const MotionSwitch = motion(Switch);
    
    return (
        <div className="flex flex-col justify-center px-8">
            <nav className="flex items-center justify-between w-full relative max-w-2xl mx-auto pt-8 pb-8 sm:pb-16">
                <MotionSwitch
                    aria-label="Enable Dark Mode"
                    initial="hidden" 
                    animate="show"
                    variants={switchLoad ? null : darkModeSwitchAnimation(shouldReduceMotion)} 
                    checked={resolvedTheme === "dark" ? false : true}
                    onChange={() => setThemeExtended()}
                    className={`${
                    resolvedTheme === "light" ? 'bg-zinc-900' : 'bg-gray-50'
                    } relative inline-flex h-6 w-11 items-center rounded-full transition delay-200 ml-auto`}
                >
                    <span className="sr-only">{resolvedTheme === "dark" ? "Turn light mode on" : "Turn dark mode on"}</span>
                    <span
                    className={`${
                        resolvedTheme === "light" ? 'translate-x-6 bg-gray-50' : 'translate-x-1 bg-zinc-900'
                    } inline-block h-4 w-4 transform rounded-full transition delay-200`}
                    />
                </MotionSwitch>
            </nav>
        </div>
    )
}