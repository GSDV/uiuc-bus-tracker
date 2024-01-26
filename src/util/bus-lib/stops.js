import { REQ_URL, API_KEY } from '@util/env';

export const fetchAllStops = async () => {
    const res = await fetch(`${REQ_URL}getstops?key=${API_KEY}`);
    const data = await res.json();
    return data;
}


export const fetchNearbyStops = async (lat, lon) => {
    const res = await fetch(`${REQ_URL}getstopsbylatlon?key=${API_KEY}&lat=${lat}&lon=${lon}`);
    const data = await res.json();
    return data;
}
