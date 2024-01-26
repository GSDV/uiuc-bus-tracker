
import { registerRootComponent } from 'expo';
// import ArrivalsList from '@components/bus/Arrivals';
import { View } from 'react';
// import { REQ_URL, API_KEY } from '@util/env';


function allstops() {
    return (
        <View style={{width: 200, height: 200, backgroundColor: 'red'}}>
        </View>
    );
}

registerRootComponent(allstops);