import { motion } from "framer-motion";
import Image from 'next/image';
import { Fragment } from "react";
//import { headerAnimation, textAnimation, avatarAnimation } from "../lib/animationVariants";

interface props {
    domain: string;
    shouldReduceMotion: boolean;
}

export default function AvatarCard({ domain, shouldReduceMotion }: props) {
    return (
        <div className="flex flex-col-reverse sm:flex-row items-start overflow-hidden">
            <div className="flex flex-col pr-8">
              <motion.h1 
                initial="hidden" 
                animate="show"
                className="font-bold text-3xl md:text-5xl tracking-tight mb-1 text-black dark:text-gray-50"
              >{domain !== process.env.NEXT_PUBLIC_domain2 ? process.env.NEXT_PUBLIC_name : process.env.NEXT_PUBLIC_fullName}</motion.h1>
              <motion.h2 
                initial="hidden" 
                animate="show" 
                className="text-gray-700 dark:text-gray-200 mb-4">Student Software Engineer {domain !== process.env.NEXT_PUBLIC_domain2 ? 
                <Fragment></Fragment>
                :
                <motion.span 
                  initial="hidden" 
                  animate="show" 
                  className="font-semibold">at {process.env.NEXT_PUBLIC_workplace} <motion.span className="text-work">{process.env.NEXT_PUBLIC_workplace2}</motion.span>
                </motion.span>}
              </motion.h2>
              <motion.p 
                initial="hidden" 
                animate="show" 
                className="text-gray-600 dark:text-gray-400 mb-10 w-fit">
                  Software interested lad from Copenhagen, Denmark.
                  <br/>
                  Currently on my 5th semester at <a className="text-cbs hover:underline underline-offset-2" href="https://www.cbs.dk/uddannelse/bachelor/hait-erhvervsoekonomi-informationsteknologi" target="_blank" rel="noopener noreferrer">Copenhagen Business School</a>. 
                  <br/>
                  Experienced with <span className="text-TypeScript">TypeScript</span>, <span className="text-React">React</span> and a little bit of <span className="text-React">React Native</span> as well. 
                  <br/>
                  Currently learning <span className="text-csharp">C#</span>, interested in learning <span className="text-svelte">Svelte</span>. 
                  <br/>
                  I maintain a <span className="text-Discord">Discord</span> bot called <a className="dark:text-yellow-300 text-yellow-600 hover:underline underline-offset-2" href="https://bentobot.xyz" target="_blank" rel="noopener noreferrer">Bento</a> as well.
                  <br/>
                  I like music of all kinds, cooking, beer, and playing video games once in a while {":-))"}.
              </motion.p>
            </div>
            <motion.div
              initial="hidden" 
              animate="show" 
              className="w-[80px] sm:w-[176px] relative mb-8 sm:mb-0 mr-auto">
              <Image
                alt={domain !== process.env.NEXT_PUBLIC_domain2 ? process.env.NEXT_PUBLIC_name as string : process.env.NEXT_PUBLIC_fullName as string}
                height={176}
                width={176}
                src="/avatar.jpg"
                sizes="30vw"
                priority={true}
                className="rounded-full filter grayscale"
              />
            </motion.div>
          </div>
    )
}