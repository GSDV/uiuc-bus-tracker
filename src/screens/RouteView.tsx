import { useEffect, useState } from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter, useGlobalSearchParams, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import MapView, { Polyline, Marker } from 'react-native-maps';

import { Ionicons, AntDesign } from '@expo/vector-icons';

import { getRoutePoints, getRouteBusLocation } from '@util/bus-lib/map';


import colorSelection from '@styles/Colors';


import CooldownButton from '@components/CooldownButton';

import headerButton_styles from '@styles/HeaderButton';

import StopMarkerSrc from '@assets/map-icons/stop.png'
import BusMarkerSrc from '@assets/map-icons/bus.png'


export default function RouteView() {
    const { stopDataParam, busDataParam } = useLocalSearchParams();
    const stopData = JSON.parse(stopDataParam as any)
    const busData = JSON.parse(busDataParam as any);

    const [routePoints, setRoutePoints] = useState([]);
    const [busLocation, setBusLocation] = useState({});

    const fetchBusLocation = async () => {
        const busLocationData = await getRouteBusLocation(busData.vehicle_id);
        setBusLocation(busLocationData);
    }

    const initScreen = async () => {
        const [routePointsData, busLocationData] = await Promise.all([
            getRoutePoints(busData.shape_id),
            getRouteBusLocation(busData.vehicle_id)
        ]);

        setRoutePoints(routePointsData);
        setBusLocation(busLocationData);
    }


    

    useEffect(() => {
        initScreen();
    }, []);

    return (
        <View style={{flex: 1}}>
            <MapView
                style={{flex: 1}} 
                initialRegion={{ latitude: stopData.latitude, longitude: stopData.longitude, latitudeDelta: 0.001, longitudeDelta: 0.001 }}
                mapType='standard' 
                showsUserLocation={true}
            >
                <RouteLine routePoints={routePoints} color={`#${busData.color}`} />
                <BusMarkers busLocation={busLocation} />
                <StopMarker stopData={stopData} />
            </MapView>
            <Header fetchBusLocation={fetchBusLocation} />
        </View>
    );
}



function Header({fetchBusLocation}: {fetchBusLocation: ()=>void}) {
    const insets = useSafeAreaInsets();

    return (
    <>
        <View style={[headerButton_styles.container, {paddingTop: insets.top}]}>
            <BackButton />
            <CooldownButton icon={'refresh'} cooldown={5} onPress={fetchBusLocation} />
        </View>
    </>
    );
}

function BackButton() {
    const router = useRouter();
    return (
        <View>
            <TouchableOpacity style={headerButton_styles.button} onPress={router.back}>
                <Ionicons name='chevron-back' size={30} color={colorSelection.whiteSoft} />
            </TouchableOpacity>
        </View>
    );
}






function RouteLine({routePoints, color}) {
    return (
        <Polyline 
            coordinates={routePoints} 
            strokeColor={color} 
            strokeWidth={10}
        />
    );
}



function BusMarkers({busLocation}) {
    return (
        <Marker 
            key='bus-marker' 
            coordinate={busLocation} 
            image={BusMarkerSrc}
        />
    );
}



function StopMarker({stopData}) {
    return (
        <Marker 
            key='stop-marker' 
            coordinate={stopData} 
            image={StopMarkerSrc} 
            anchor={{x: 0.5, y: 1}} 
            title={stopData.name}
        />
    );
}









