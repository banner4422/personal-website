import { motion } from "framer-motion";
import Image from "next/image";
import { Fragment } from "react";
//import { headerAnimation, textAnimation, avatarAnimation } from "../lib/animationVariants";

interface props {
  domain: string;
  shouldReduceMotion: boolean;
}

export default function AvatarCardHalloween({ domain, shouldReduceMotion }: props) {
  return (
    <div className="flex flex-col-reverse sm:flex-row items-start overflow-hidden">
      <div className="flex flex-col pr-8">
        <motion.h1
          initial="hidden"
          animate="show"
          className="font-bold text-3xl md:text-5xl tracking-tight mb-3 text-black dark:text-gray-50"
        >
          Christian Krogh Nielsen
        </motion.h1>
        <motion.h2
          initial="hidden"
          animate="show"
          className="text-gray-700 dark:text-gray-200 mb-4"
        >
          Student Finance Assistant at{" "}
          <motion.span
            initial="hidden"
            animate="show"
            className="font-semibold"
          >
            Copenhagen{" "}
            <motion.span className="text-work">Optimization</motion.span>
          </motion.span>
          <br />
          Founder and financial advicer for the{" "}
          <span className="text-Discord">Discord</span> bot{" "}
          <a
            className="dark:text-yellow-300 text-yellow-600 hover:underline underline-offset-2"
            href="https://bentobot.xyz"
            target="_blank"
            rel="noopener noreferrer"
          >
            Bento
          </a>
        </motion.h2>
        <motion.p
          initial="hidden"
          animate="show"
          className="text-gray-600 dark:text-gray-400 mb-10 w-fit"
        >
          Finance interested man from Copenhagen,{" "}
          <span className="text-red-500">Denmark</span>.
          <br />
          Currently studying a Master{"'"}s Degree in Advanced Economics and Finance
          at{" "}
          <a
            className="text-cbs hover:underline underline-offset-2"
            href="https://www.cbs.dk/en/study/graduate/msc-in-business-administration-and-information-systems"
            target="_blank"
            rel="noopener noreferrer"
          >
            Copenhagen Business School
          </a>
          .
          <br />
          Got a Bachelor{"'"}s Degree in Economics and Business Administration
          Systems from{" "}
          <a
            className="text-cbs hover:underline underline-offset-2"
            href="https://www.cbs.dk/uddannelse/bachelor/hait-erhvervsoekonomi-informationsteknologi"
            target="_blank"
            rel="noopener noreferrer"
          >
            Copenhagen Business School
          </a>{" "}
          as well.
          <br />
        </motion.p>
      </div>
      <motion.div
        initial="hidden"
        animate="show"
        className="w-[80px] sm:w-[176px] relative mb-8 sm:mb-0 mr-auto"
      >
        <Image
          alt="Christian Nielsen"
          height={176}
          width={176}
          src="/avatar.jpg"
          sizes="30vw"
          priority={true}
          className="rounded-full filter grayscale"
        />
      </motion.div>
    </div>
  );
}
