import { useEffect, useState, useContext } from 'react';
import { View } from 'react-native';

import { StopListManagerContext } from '@util/contexts/stops/StopListContext';

import { Marker } from 'react-native-maps';
import MapView from 'react-native-map-clustering';

import { Header } from '@components/NavHeader';

import StopMarkerSrc from '@assets/map-icons/mini-stop.png'
import colorSelection from '@styles/Colors';



export default function Map() {
    const slmContext = useContext(StopListManagerContext);
    const [stopsList, setStopsList] = useState([]);

    const getLoc = (stopData) => {
        const loc = {latitude: 0, longitude: 0};
        for (let i=0; i<stopData.stop_points.length; i++) {
            loc.latitude = loc.latitude + stopData.stop_points[i].stop_lat;
            loc.longitude = loc.longitude + stopData.stop_points[i].stop_lon;
        }
        loc.latitude = loc.latitude / stopData.stop_points.length;
        loc.longitude = loc.longitude / stopData.stop_points.length;
        return loc;
    }

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
                clusterColor={colorSelection.orangeSecondary} 
                radius={20} 
                animationEnabled={false}
            >
                {/* We cannot put this marker into its own component, we need to render it here for react-native-map-clustering to work. */}
                {stopsList.map((stopData, i) => (
                    <Marker 
                        key={`stop-${i}`} 
                        coordinate={getLoc(stopData)} 
                        image={StopMarkerSrc} 
                        anchor={{x: 0.5, y: 1}} 
                        title={stopData.stop_name} 
                        tracksViewChanges={false}
                    />
                ))}
            </MapView>
        </View>
    );
}