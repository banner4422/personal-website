import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin, faDiscord } from '@fortawesome/free-brands-svg-icons'
import { Popover, Transition } from '@headlessui/react'
import { Fragment } from 'react'

export const socialMediaButtonsData: {colour: string, link?: string}[] = [
    {
      colour: "GitHub",
      link: "https://github.com/banner4422"
    },
    {
      colour: "LinkedIn",
      link: "https://www.linkedin.com/in/christian-krogh-nielsen-55152625a/"
    },
    {
      colour:"Discord"
    }
  ]

export default function SocialMediaButton({link, colour}: {link?: string, colour: string}) {
    if (colour === "Discord") {
        return (
            <div className="">
                    <Popover className="relative">
                        {({ open }) => (
                            <Fragment>
                                <Popover.Button className={`
                                    m-2 
                                    text-center 
                                    bg-gray-50 
                                    dark:bg-zinc-900 
                                    inline-block 
                                    place-items-center 
                                    p-5 
                                    w-32 
                                    h-32 
                                    hover:bg-Discord dark:hover:bg-Discord
                                    border-2 
                                    rounded-social 
                                    border-zinc-900 
                                    dark:border-gray-50 
                                    mx-auto 
                                    dark:text-gray-50 
                                    text-zinc-900 
                                    hover:text-white 
                                    dark:hover:text-white`}>
                                    {colour === "Discord" && <FontAwesomeIcon icon={faDiscord} className="w-20 h-20 mx-auto my-auto" />}
                                </Popover.Button>
                                <Transition
                                    show={open}
                                    enter="transition duration-200 ease-out"
                                    enterFrom="transform scale-95 opacity-0"
                                    enterTo="transform scale-100 opacity-100"
                                    leave="transition duration-200 ease-out"
                                    leaveFrom="transform scale-100 opacity-100"
                                    leaveTo="transform scale-95 opacity-0"
                                >
                                    <Popover.Panel className="
                                        absolute 
                                        z-10 
                                        border 
                                        rounded-lg
                                        text-center
                                        dark:border-opacity-10
                                        border-zinc-900 
                                        dark:border-gray-50 
                                        dark:text-gray-50 
                                        text-zinc-900 
                                        hover:text-white 
                                        dark:hover:text-white
                                        transition-all
                                        delay-200
                                        ">
                                        <div>
                                            My Discord is Banner#1017
                                        </div>
                                    </Popover.Panel>
                                </Transition>
                            </Fragment>
                        )}
                    </Popover>
            </div>
        )
    } else {
        return (
            <div className="">
                <a className={`
                    m-2 
                    text-center 
                    bg-gray-50 
                    dark:bg-zinc-900 
                    inline-block 
                    place-items-center 
                    p-5 
                    w-32 
                    h-32 
                    ${colour === "GitHub" ? 
                    "hover:bg-GitHub dark:hover:bg-GitHub" : 
                    colour === "LinkedIn" ? "hover:bg-LinkedIn dark:hover:bg-LinkedIn" :
                    colour === "Discord" ? "hover:bg-Discord dark:hover:bg-Discord" : ""} 
                    border-2 
                    rounded-social 
                    border-zinc-900 
                    dark:border-gray-50 
                    mx-auto 
                    dark:text-gray-50 
                    text-zinc-900 
                    hover:text-white 
                    dark:hover:text-white
                    `} href={link !== null ? link : ""}>
                    {colour === "GitHub" && <FontAwesomeIcon icon={faGithub} className="w-20 h-20 mx-auto my-auto" />}
                    {colour === "LinkedIn" && <FontAwesomeIcon icon={faLinkedin} className="w-20 h-20 mx-auto my-auto" />}
                </a>
            </div>
        )
    }
}