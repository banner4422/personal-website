"use client";
import { Switch } from "@headlessui/react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(" ");
}

interface navigationRoute {
    name: string;
    route: string;
    current: boolean;
}

const navigationRoutes: navigationRoute[] = [
    { name: "Home", route: "/", current: false },
    { name: "About", route: "/about", current: false },
];

export default function NavBar() {
    const { resolvedTheme, setTheme } = useTheme();
    const pathname = usePathname();
    const currentRoute = navigationRoutes.find((route) => route.route === pathname);
    const navigationRoutesWithCurrent = navigationRoutes.map((route) => ({
        ...route,
        current: route === currentRoute,
    }));
    return (
        <div className="flex flex-col justify-center px-8">
            <nav className="flex items-center justify-between w-full relative max-w-2xl mx-auto pt-8 pb-8 sm:pb-16">
                <div className="ml-[-0.60rem]">
                    {navigationRoutesWithCurrent.map((route) => (
                        <Link 
                            key={route.route}
                            href={route.route}
                            className={classNames(
                                route.current ? "font-semibold text-gray-800 dark:text-gray-200" : "font-normal text-gray-600 dark:text-gray-400",
                                "p-1 px-3 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-all"
                            )}
                        >
                            {route.name}
                        </Link>
                    ))}
                </div>
                {resolvedTheme && 
                    <Switch
                        aria-label="Enable Dark Mode"
                        checked={resolvedTheme === "dark" ? false : true}
                        onChange={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
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
                    </Switch>
                }
            </nav>
        </div>
    )
}