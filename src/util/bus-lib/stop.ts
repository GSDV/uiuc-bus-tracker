import { REQ_URL, API_KEY } from '@util/env';



const fetchStopDepartures = async (id) => {
    const res = await fetch(`${REQ_URL}getdeparturesbystop?key=${API_KEY}&stop_id=${id}&pt=60`);
    if (!res.ok) return null;
    const data = await res.json();
    return data.departures;
}



export { fetchStopDepartures };