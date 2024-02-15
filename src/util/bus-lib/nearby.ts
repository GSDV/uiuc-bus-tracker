import { REQ_URL, API_KEY } from '@util/env';



const getNearbyStops = async (loc) => {
    try {
        const res = await fetch(`${REQ_URL}getstopsbylatlon?key=${API_KEY}&lat=${loc.lat}&lon=${loc.lon}`);
        const data = await res.json();
        return data.stops;
    } catch (err) {
        console.error(err);
        return [];
    }
}



export { getNearbyStops };