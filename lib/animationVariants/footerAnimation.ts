import { Variants } from "framer-motion"

export function footerAnimation(shouldReduceMotion: boolean) {
  let variants: Variants = {};
  const isMobile = window.innerWidth < 768;
  if (!isMobile) {  
  return (
    variants = shouldReduceMotion ? 
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
            hidden: { opacity: 0, y: "100vh" },
            show: {
                opacity: 1,
                y: "0",
                transition: {
                  duration: 3,
                  delay: 1.5,
                  type: "spring",
                  damping: 25,
                  stiffness: 300,
                },
            },
          }
    )
  }
}