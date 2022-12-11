import { motion, useReducedMotion } from 'framer-motion'
import type { NextPage } from 'next';
import { useTheme } from 'next-themes';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import AvatarCard from '../components/AvatarCard';
import Container from '../components/Container';
import SocialMediaButton, { socialMediaButtonsData } from '../components/SocialMediaButton';
//import { mediaBoxAnimation } from '../lib/animationVariants';

const Home: NextPage = () => {
  const [mounted, setMounted] = useState(false);
  const [domain, setDomain] = useState("");
  const [switchLoad, setSwitchLoad] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const { resolvedTheme, setTheme } = useTheme();

  function setThemeExtended() {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
    setSwitchLoad(true);
  }

  useEffect(() => {
    setMounted(true);
    setDomain(window.location.hostname);
  }, [])

  if (!mounted) {
    return null
  }
  
  return (
    <Container 
      resolvedTheme={resolvedTheme!} 
      setThemeExtended={setThemeExtended} 
      shouldReduceMotion={shouldReduceMotion!} 
      switchLoad={switchLoad} >
      <Head>
        <title>{domain !== process.env.NEXT_PUBLIC_domain1 ? process.env.NEXT_PUBLIC_name : process.env.NEXT_PUBLIC_fullName}</title>
      </Head>
      <div className="flex flex-col justify-center items-start max-w-2xl mx-auto pb-6">
        <AvatarCard domain={domain} shouldReduceMotion={shouldReduceMotion!} />
        <motion.div 
          initial="hidden" 
          animate="show" 
          className="mx-auto md:flex-row flex flex-wrap text-center justify-center gap-4 md:gap-16 pb-8">
          {socialMediaButtonsData.map(x => 
            (<SocialMediaButton key={x.colour} colour={x.colour} link={x.link} />)
          )}
        </motion.div>
      </div>
    </Container>
  )
}

export default Home
