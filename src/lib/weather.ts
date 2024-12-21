import { fetchWeatherApi } from 'openmeteo';

function weatherCodeToDescription(weatherCode: number) {
    switch (weatherCode) {
        case 0:
            return "Clear sky ";
        case 1:
            return "Mainly clear sky";
        case 2:
            return "Partly cloudy sky";
        case 3:
            return "Overcast sky";
        case 45:
            return "Fog";
        case 48:
            return "Depositing rime fog";
        case 51:
            return "Light drizzle";
        case 53:
            return "Moderate drizzle";
        case 55:
            return "Dense drizzle";
        case 56:
            return "Freezing light drizzle";
        case 57:
            return "Freezing dense drizzle";
        case 61:
            return "Slight rain";
        case 63:
            return "Moderate rain";
        case 65:
            return "Heavy rain";
        case 66:
            return "Freezing light rain"
        case 67:
            return "Freezing heavy rain";
        case 71:
            return "Slight snowfall";
        case 73:
            return "Moderate snowfall";
        case 75:
            return "Heavy snowfall";
        case 77:
            return "Snow grains";
        case 80:
            return "Slight rain showers";
        case 81:
            return "Moderate rain showers"
        case 82:
            return "Heavy rain showers";
        case 85:
            return "Slight snow showers";
        case 86:
            return "Heavy snow showers";
        case 95:
            return "Thunderstorm: Slight or moderate";
        case 96:
        case 99:
            return "Thunderstorm with slight and heavy hail";
        default:
            return "Unknown weather code";
    }
}

async function getWeather() {
    const params = {
        "latitude": 55.6759,
        "longitude": 12.5655,
        "current": ["temperature_2m", "relative_humidity_2m", "apparent_temperature", "is_day", "precipitation", "rain", "showers", "snowfall", "weather_code", "wind_speed_10m", "wind_direction_10m", "wind_gusts_10m"],
        "timezone": "Europe/Berlin",
        "forecast_days": 1
    };
    const url = "https://api.open-meteo.com/v1/forecast";
    const responses = await fetchWeatherApi(url, params);

    // Helper function to form time ranges
    const range = (start: number, stop: number, step: number) =>
        Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

    // Process first location. Add a for-loop for multiple locations or weather models
    const response = responses[0];

    // Attributes for timezone and location
    const utcOffsetSeconds = response.utcOffsetSeconds();
    const timezone = response.timezone();
    const timezoneAbbreviation = response.timezoneAbbreviation();
    const latitude = response.latitude();
    const longitude = response.longitude();

    const current = response.current()!;

    // Note: The order of weather variables in the URL query and the indices below need to match!
    const weatherData = {
        current: {
            time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
            temperature2m: current.variables(0)!.value(),
            relativeHumidity2m: current.variables(1)!.value(),
            apparentTemperature: current.variables(2)!.value(),
            isDay: current.variables(3)!.value(),
            precipitation: current.variables(4)!.value(),
            rain: current.variables(5)!.value(),
            showers: current.variables(6)!.value(),
            snowfall: current.variables(7)!.value(),
            weatherCode: current.variables(8)!.value(),
            windSpeed10m: current.variables(9)!.value(),
            windDirection10m: current.variables(10)!.value(),
            windGusts10m: current.variables(11)!.value(),
        },

    };

    return {
        dateTime: weatherData.current.time,
        temperature: weatherData.current.temperature2m,
        humidity: weatherData.current.relativeHumidity2m,
        temperatureFeelsLike: weatherData.current.apparentTemperature,
        isDay: weatherData.current.isDay === 1,
        description: weatherCodeToDescription(weatherData.current.weatherCode),
    }

}