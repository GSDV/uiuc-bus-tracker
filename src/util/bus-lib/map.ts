import { REQ_URL, API_KEY } from '@util/env';



const getRoutePoints = async (shape_id) => {
    try {
        const res = await fetch(`${REQ_URL}getshape?key=${API_KEY}&shape_id=${shape_id}`);
        const data = await res.json();
        const dots = data.shapes.map(p => ({latitude: p.shape_pt_lat, longitude: p.shape_pt_lon, stop_id: p.stop_id}));
        return dots;
    } catch (err) {
        console.error(err);
        return [];
    }
}



const getRouteBusLocation = async (vehicle_id) => {
    try {
        const res = await fetch(`${REQ_URL}getvehicle?key=${API_KEY}&vehicle_id=${vehicle_id}`);
        const data = await res.json();
        const busLocation = data.vehicles[0].location;
        return {latitude: busLocation.lat, longitude: busLocation.lon};
    } catch (err) {
        console.error(err);
        return {latitude: 0, longitude: 0};
    }
}



export { getRoutePoints, getRouteBusLocation };