import { REQ_URL, API_KEY } from '@util/env';



const fetchAllStops = async () => {
    const res = await fetch(`${REQ_URL}getstops?key=${API_KEY}`);
    if (!res.ok) return null;
    const data = await res.json();
    return data.stops;
}



const fetchNearbyStops = async (lat, lon) => {
    const res = await fetch(`${REQ_URL}getstopsbylatlon?key=${API_KEY}&lat=${lat}&lon=${lon}`);
    if (!res.ok) return null;
    const data = await res.json();
    return data;
}



export { fetchAllStops, fetchNearbyStops };