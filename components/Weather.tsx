import useSWR from "swr";
import fetcher from "../lib/fetcher";
import { useEffect, useRef, useState } from "react";

interface WeatherData {
    dateTime: string;
    temperature: number;
    humidity: number;
    temperatureFeelsLike: number;
    isDay: boolean;
    description: string;
}

export default function Weather() {
    const timeRef = useRef<HTMLSpanElement>(null);
    const { data } = useSWR<WeatherData>('/api/weather', fetcher);

    useEffect(() => {
        const timer = setInterval(() => {
            if (timeRef.current) {
                const currentTime = new Date().toLocaleTimeString('en-DK', { timeZone: 'Europe/Copenhagen' });
                timeRef.current.textContent = currentTime;
            }
        }, 1000);

        // Cleanup the interval on component unmount
        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <div className="flex flex-row-reverse items-center sm:flex-row mb-2 space-x-0 sm:space-x-2 w-full">
            <div className="inline-flex flex-col sm:flex-row w-full max-w-full truncate">
            <p className="capsize text-gray-800 dark:text-gray-200 font-medium">
                📍 Copenhagen 🇩🇰 {" "}
                <span ref={timeRef}>{new Date().toLocaleTimeString('en-DK', { timeZone: 'Europe/Copenhagen' })}</span>
            </p>
            </div>
        </div>
    );
};