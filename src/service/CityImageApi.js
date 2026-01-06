const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
const BASE_URL = 'https://api.unsplash.com';

export async function fetchCityImage(city) {
    const query = encodeURIComponent(`${city} landmark  skyline cityscape famous place`);
    const response = await fetch(`${BASE_URL}/search/photos?query=${query}&orientation=landscape&per_page=1`, {
            headers: {
                Authorization: `Client-ID ${ACCESS_KEY}`
            }
        });

    if (!response.ok) {
        throw new Error('Failed to fetch city image');
    }
    const data = await response.json();
    return data.results?.[0]?.urls?.regular 
    || 'https://images.unsplash.com/photo-1501785888041-af3ef285b470';

}