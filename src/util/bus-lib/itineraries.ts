import { REQ_URL, API_KEY } from '@util/env';



interface LocationType {
    latitude: number,
    longitude: number
}

type MinimizeType = 'time' | 'walking' | 'transfers';

const getItineraries = async (origin: LocationType, destination: LocationType, minimize: MinimizeType) => {
    const response = {
        code: 0,
        msg: '',
        itineraries: [],
    }

    try {
        const res = await fetch(`${REQ_URL}getplannedtripsbylatlon?key=${API_KEY}&origin_lat=${origin.latitude}&origin_lon=${origin.longitude}&destination_lat=${destination.latitude}&destination_lon=${destination.longitude}&minimize=${minimize}&max_walk=1`);
        const data = await res.json();

        response.msg = data.status.msg;
        response.itineraries = data.itineraries;
        response.code = (data.itineraries.length==0) ? 455 : 200;
        return response;
    } catch (err) {
        console.error(err);
        response.msg = 'There was a server error. Please try again later.';
        response.itineraries = [];
        response.code = 500;
        return response;
    }
}



const isWalkComponentEnd = (name: string) => {
    const pattern = /^\d+(\.\d+)*,\s-\d+(\.\d+)*$/;
    return pattern.test(name);
}



export { getItineraries, isWalkComponentEnd, MinimizeType };