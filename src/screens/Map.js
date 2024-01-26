// nearby
import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { useNavigation, useRouter, useLocalSearchParams } from "expo-router";

import { BusRouteMap } from '@util/bus-lib/map';

export default function Map() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const { id, other } = params;
    // router.push({ pathname: "/", params: { post: "random", id, other } });

    // useEffect(() => {
    //     callAsyncFetch();
    // }, []); 

    return (
        <View>
            
        </View>
    )
}



function EE() {
    
    return (
        <View>
            <BusRouteMap shape_id={1} bus_locations={1} color={1} />
        </View>
    );
}