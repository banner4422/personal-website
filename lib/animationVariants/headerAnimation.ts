import { Variants } from "framer-motion"

export function headerAnimation(shouldReduceMotion: boolean): Variants {
    return (
        shouldReduceMotion ? 
    {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                duration: 0.5,
            }
        },
    } 
    : 
    {
        hidden: { opacity: 0, y: "-100vh" },
        show: {
            opacity: 1,
            y: "0",
            transition: {
            duration: 5,
            type: "spring",
            damping: 25,
            stiffness: 300,
            }
        },
    }
    )
}