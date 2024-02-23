import { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

import MapView, { Marker } from 'react-native-maps';

import { MapPressEvent } from 'react-native-maps';

import tripPlanner_styles from '@styles/TripPlanner';

import { Header } from '@components/NavHeader';


import StartMarkerSrc from '@assets/map-icons/stop.png'
import EndMarkerSrc from '@assets/map-icons/blue-stop.png'



export default function TripPlanner() {
    const router = useRouter();

    const [startPoint, setStartPoint] = useState({latitude: 0, longitude: 0});
    const [endPoint, setEndPoint] = useState({latitude: 0, longitude: 0});

    const [instr, setInstr] = useState(0);
    const instructions = [
        {title: 'Pick a starting point', msg: 'Press on the map' },
        {title: 'Pick an ending point', msg: 'Press on the map' }
    ];

    const updateInstr = (step: number) => {
        if (instr==1 && step==-1) setEndPoint({latitude: 0, longitude: 0});
        if (instr==1 && step==1) router.push(`/plan?originParam=${JSON.stringify(startPoint)}&destinationParam=${JSON.stringify(endPoint)}`);
        setInstr(instr + step);
    }


    const [errMsg, setErrMsg] = useState('');
    const [errTimer, setErrTimer] = useState(0);
    const errFade = 1;
    const [errShown, setErrShown] = useState(false);
    const errTimerRef = useRef(null);

    const updateTimer = (prevTimer) => {
        if (prevTimer > 0) return prevTimer - 0.01;
        clearInterval(errTimerRef.current);
        setErrShown(false)
        return errFade;
    }

    const displayError = (msg: string) => {
        if (errShown) return;
        setErrShown(true);
        setErrMsg(msg);
        setErrTimer(errFade);
    }


    const addMarker = (event: MapPressEvent) => {
        const coords = event.nativeEvent.coordinate;
        if (coords.latitude>=40.2 || coords.latitude<=39.9 || coords.longitude>=-88.0 || coords.longitude<=-88.4) {
            displayError('Pick a point closer to Champaing-Urbana area');
            return;
        }
        if (instr==0) setStartPoint(coords);
        else if (instr==1) setEndPoint(coords);
    }


    useEffect(() => {
        if (!errShown) return;
        errTimerRef.current = setInterval(() => {setErrTimer(updateTimer);}, 10);
        return () => clearInterval(errTimerRef.current);
    }, [errShown]);

    return (
        <View style={{flex: 1}}>
            <Header title='Trip Planner' />

            <View style={{flex: 1}}>
                <MapView 
                    style={{flex: 1}} 
                    initialRegion={{ latitude: 40.11131, longitude: -88.24058, latitudeDelta: 0.2, longitudeDelta: 0.2 }} 
                    onPress={addMarker} 
                    mapType='standard' 
                    showsUserLocation={true}
                >
                    {(startPoint.latitude!=0) && <PointMarker k='point-1'  loc={startPoint} />}
                    {(endPoint.latitude!=0) && <PointMarker k='point-2' loc={endPoint} />}
                </MapView>

                <Instructions title={instructions[instr].title} msg={instructions[instr].msg} />

                {(instr!=0) && <InstructionButton title='Back' onPress={() => updateInstr(-1)} />}
                {(startPoint.latitude!=0) && <InstructionButton title='Next' onPress={() => updateInstr(1)} />}

                {(errShown) && <Error msg={errMsg} timer={errTimer} errFade={errFade} />}
            </View>
        </View>
    );
}



function InstructionButton({title, onPress}: {title: string, onPress: ()=>void}) {
    const pos = (title=='Next') ? {right: 20} : {left: 20};
    return (
        <TouchableOpacity onPress={onPress} style={[tripPlanner_styles.instrButtonContainer, pos]}>
            <Text style={tripPlanner_styles.instrButtonText}>{title}</Text>
        </TouchableOpacity>
    )
}




function Instructions({title, msg}) {
    return (
        <View style={tripPlanner_styles.instrContainer}>
            <Text style={tripPlanner_styles.instrText}>{title}</Text>
            <Text style={tripPlanner_styles.instrText}>{msg}</Text>
        </View>
    );
}



function Error({msg, timer, errFade}) {
    return (
        <View style={[tripPlanner_styles.errButton, {opacity: (timer/(errFade/2))}]}>
            <Text style={tripPlanner_styles.errText}>{msg}</Text>
        </View>
    )
}



function PointMarker({loc, k}) {
    const img = (k=='point-1') ? StartMarkerSrc : EndMarkerSrc;
    return (
        <Marker 
            key={k} 
            coordinate={loc} 
            image={img} 
            anchor={{x: 0.5, y: 1}}
        />
    );
}