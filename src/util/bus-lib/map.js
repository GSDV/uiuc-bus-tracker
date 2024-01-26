import { REQ_URL, API_KEY } from '@util/env';
import { useState } from 'react';
import MapView, { Polyline } from 'react-native-maps';



export function BusRouteMap({ shape_id, bus_locations, color }) {
    const [ routePoints, setRoutePoints ] = useState([]);
    const [ stopPoints, setStopPoints ] = useState([]);

    const getRouteInfo = async () => {
        const data = await getRoutePoints(shape_id)
        const points = data.map(p => ({latitude: p.latitude, longitude: p.longitude}));
        const stops = data;

        setRoutePoints(points);
        setStopPoints(stops);
    }

    useEffect(() => {
        getRouteInfo();
    }, []);

    return (
        <MapView
            style={{width: 500, height: 500}}
            initialRegion={{ latitude: 40.13, longitude: -88.29, latitudeDelta: -0.1, longitudeDelta: -0.1 }}
        >
            <BusRoutePolyline routePoints={routePoints} color={color} />
            <BusRoutesBusPOS bus_locations={bus_locations} />
            <BusRouteStops stops={stopPoints} />
        </MapView>
    );
}



const getRoutePoints = async (shape_id) => {
    console.log(shape_id);
    console.log(`${REQ_URL}getshape?key=${API_KEY}&shape_id=${shape_id}`);
    try {
        const res = await fetch(`${REQ_URL}getshape?key=${API_KEY}&shape_id=${shape_id}`);
        const data = await res.json();
        console.log(data);
        const dots = data.shapes.map(p => ({latitude: p.shape_pt_lat, longitude: p.shape_pt_lon, stop_id: p.stop_id}));
        return dots;
    } catch (err) {
        console.error(err);
        return [];
    }
}



function BusRoutesBusPOS(bus_locations) {
    return (<>
        {bus_locations.map(l =>
            <Marker
                coordinate={{latitude: l.lat, longitude: l.lon}}
                image={{uri: 'bus_photo'}}
            />
        )}
    </>);
}



function BusRoutePolyline(routePoints, color) {
    return (
        <Polyline
            coordinates={routePoints}
            strokeColor={color}
            strokeWidth={6}
        />
    );
}



function BusRouteStops({ stops }) {
    return (<>
        {stops.map(p => { p.stopPoints!=null &&
            <Marker
                coordinate={{latitude: p.latitude, longitude: p.latitude}}
                image={{uri: 'stop_photo'}}
            />
        })}
    </>);
}