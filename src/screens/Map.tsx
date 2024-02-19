import { useEffect, useState, useContext } from 'react';
import { View } from 'react-native';

import { StopListManagerContext } from '@util/contexts/stops/StopListContext';

import MapView, { Marker } from 'react-native-maps';

import Header from '@components/Header';

import StopMarkerSrc from '@assets/map-icons/mini-stop.png'



export default function Map() {
    const slmContext = useContext(StopListManagerContext);
    const [stopsList, setStopsList] = useState([]);

    useEffect(() => {
        setStopsList(slmContext.slm.list);
    }, [slmContext.isLoading]);

    return (
        <View style={{flex: 1}}>
            <Header title='Bus Stops' />
            <MapView
                style={{flex: 1}} 
                initialRegion={{ latitude: 40.11131, longitude: -88.24058, latitudeDelta: 0.2, longitudeDelta: 0.2 }} 
                mapType='standard' 
                showsUserLocation={true}
            >
                {stopsList.map((stop, i) => <StopMarker stopData={stop} i={i} />)}
            </MapView>
        </View>
    );
}



function StopMarker({stopData, i}) {
    const loc = {latitude: 0, longitude: 0};
    for (let i=0; i<stopData.stop_points.length; i++) {
        loc.latitude = loc.latitude + stopData.stop_points[i].stop_lat;
        loc.longitude = loc.longitude + stopData.stop_points[i].stop_lon;
    }
    loc.latitude = loc.latitude / stopData.stop_points.length;
    loc.longitude = loc.longitude / stopData.stop_points.length;

    return (
        <Marker 
            key={`stop-${i}`} 
            coordinate={loc} 
            image={StopMarkerSrc} 
            anchor={{x: 0.5, y: 1}} 
            title={stopData.stop_name} 
            tracksViewChanges={false}
        />
    );
}