import { REQ_URL, API_KEY } from '@util/env';



const fetchAllStops = async (changeset_id) => {
    const res = await fetch(`${REQ_URL}getstops?key=${API_KEY}&changeset_id=${changeset_id}`);
    if (!res.ok) return null;
    const data = await res.json();
    return data;
}



const fetchNearbyStops = async (lat, lon) => {
    const res = await fetch(`${REQ_URL}getstopsbylatlon?key=${API_KEY}&lat=${lat}&lon=${lon}`);
    if (!res.ok) return null;
    const data = await res.json();
    return data;
}



export { fetchAllStops, fetchNearbyStops };