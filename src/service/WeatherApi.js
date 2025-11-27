const API_KEY = "eb2cb81230fef2bd6448412d09964024";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export async function fetchWeatherByCity(city) {
    const q = encodeURIComponent(city);
    const response = await fetch(`${BASE_URL}/forecast?q=${q}&appid=${API_KEY}&units=metric`);
    if(!response.ok) {
        throw new Error ("City not found");
    }

    const data = await response.json();
    return data;
}