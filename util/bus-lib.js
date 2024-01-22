
const req_url = process.env.REQ_URL;
const api_key = process.env.API_KEY;

const fetchAllStops = async () => {
    const res = await fetch(`${req_url}getstops?key=${api_key}`);
    const data = await res.json();
    return data;
}


const fetchNearbyStops = async (lat, lon) => {
    const res = await fetch(`${req_url}getstopsbylatlon?key=${api_key}&lat=${lat}&lon=${lon}`);
    const data = await res.json();
    return data;
}


export { fetchAllStops, fetchNearbyStops }