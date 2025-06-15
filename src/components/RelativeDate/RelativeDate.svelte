<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import dayjs from "dayjs";
    import advancedFormat from "dayjs/plugin/advancedFormat";
    import localizedFormat from "dayjs/plugin/localizedFormat";
    import relativeTime from "dayjs/plugin/relativeTime";
    import timezone from "dayjs/plugin/timezone";
    import utc from "dayjs/plugin/utc";

    // Extend dayjs with plugins
    dayjs.extend(utc);
    dayjs.extend(timezone); // Support 'z' to display timezone
    dayjs.extend(localizedFormat); // Support 'LLLL' to display full date
    dayjs.extend(advancedFormat); // Support 'z' to display timezone
    dayjs.extend(relativeTime); // Support .fromNow()

    export let date: Date | null;
    let dateTime: string = "";
    let formattedTimestamp: string = "";
    let displayTime: string = "";
    let intervalId: ReturnType<typeof setInterval>;

    const updateRelativeTime = () => {
        if (date === null) {
            dateTime = "";
            formattedTimestamp = "";
            displayTime = "at some point";
        } else {
            try {
                // Ensure date is a valid Date object
                const validDate =
                    date instanceof Date && !isNaN(date.getTime()) ? date : new Date();

                // Set timezone if undefined, keeping local time the same
                const dateObj = dayjs(validDate);

                // Display date as ISO string, e.g. "2021-01-15T20:00:00-05:00"
                dateTime = dateObj.toISOString();

                // Display date as title tooltip, e.g. "January 15, 2021 8:00 PM"
                formattedTimestamp = dateObj.format("LLLL z");

                if (dayjs().diff(dateObj, "day") < 2) {
                    // If less than 2 days, display relative date, e.g. "a day ago", "6 hours ago"
                    displayTime = dateObj.fromNow();
                } else {
                    if (dayjs().isSame(validDate, "year")) {
                        // If current year, display month and day, e.g. "Jan 15"
                        displayTime = dateObj.format("MMM D");
                    } else {
                        // Otherwise display full date, e.g. "Jan 15, 2021"
                        displayTime = dateObj.format("ll");
                    }
                }
            } catch (error) {
                console.error("Error formatting date:", error);
                dateTime = "";
                formattedTimestamp = "";
                displayTime = "Invalid date";
            }
        }
    };

    onMount(() => {
        updateRelativeTime();
        // Update every minute
        intervalId = setInterval(updateRelativeTime, 60000);
    });

    onDestroy(() => {
        clearInterval(intervalId);
    });
</script>

<time datetime={dateTime} title={formattedTimestamp}>
    {displayTime || ""}
</time>
