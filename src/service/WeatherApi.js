const API_KEY = "eb2cb81230fef2bd6448412d09964024";
const BASE_URL = "https://api.openweathermap.org/data/2.5";
const GEO_BASE_URL = "https://api.openweathermap.org/geo/1.0";

export async function fetchWeatherByCity(city) {
    const q = encodeURIComponent(city);
    const response = await fetch(`${BASE_URL}/forecast?q=${q}&appid=${API_KEY}&units=metric`);
    if(!response.ok) {
        throw new Error ("City not found");
    }

    const data = await response.json();
    console.log(data);
    return data;
}

export async function fetchCityCoordinates(city) {
    const q = encodeURIComponent(`${city},MM`);
    const response = await fetch(`${GEO_BASE_URL}/direct?q=${q}&limit=5&appid=${API_KEY}`);
    if(!response.ok) {
        throw new Error ("City not found");
    }
    const data = await response.json();
    return data;
}
