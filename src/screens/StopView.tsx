import { useEffect, useState, useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useRouter, useGlobalSearchParams } from 'expo-router';

import { Ionicons } from '@expo/vector-icons';

import { fetchStopDepartures } from '@util/bus-lib/stop';

import TopSafeArea from '@components/safearea/Top';
import IncomingBus from '@components/bus/IncomingBus';
import { BusExpression } from '@components/BusExpression';

import colorSelection from '@styles/Colors';

import { findStopName, encodeStopName } from '@util/bus-lib/name';
import { StopListManagerContext } from '@util/contexts/stops/StopListContext';

import { calcBackLink } from '@util/calcBack';

import { NavContext } from '@util/contexts/nav/NavContext';

import { Header, HeaderButtonType } from '@components/Header';



export default function StopView() {
    const { id, name, locParam } = useGlobalSearchParams();
    const nameParam = Array.isArray(name) ? name[0] : name;
    const loc = JSON.parse(locParam as any);

    const [refresher, refresh] = useState(false);

    const [deps, setDeps] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [mtdDown, setMtdDown] = useState(false);

    const refreshView = () => {
        refresh(!refresher);
    }

    const initScreen = async () => {
        setIsLoading(true);
        const data = await fetchStopDepartures(id);
        if (!data) setMtdDown(true);
        setDeps(data);
        setIsLoading(false);
    }

    useEffect(() => {
        initScreen();
    }, [refresher]);

    return (
    <>
        {/* <Header name={nameParam} refreshView={refreshView} /> */}
        <StopViewHeader name={nameParam} refreshView={refreshView} />
        {mtdDown ? <BusExpression img='dead' msg='The MTD Bus API is currently down. Please check back later.' /> : <Departures isLoading={isLoading} deps={deps} loc={loc} />}
    </>
    );
}




function StopViewHeader({name, refreshView}: {name: string, refreshView: () => void}) {
    const navContex = useContext(NavContext);
    const router = useRouter();
    const goBack = () => router.navigate(calcBackLink(navContex.curr));

    const leftButton: HeaderButtonType = {icon: 'chevron-back', onPress: goBack};
    const rightButton: HeaderButtonType = {icon: 'refresh', onPress: refreshView};

    return <Header title={name} leftButton={leftButton} rightButton={rightButton} />;
}



function Departures({isLoading, deps, loc}) {
    return (
    <>
        {isLoading && <BusExpression img='loading' msg='Fetching departures...' />}
        {!isLoading &&
            <ScrollView contentContainerStyle={{display: 'flex', alignItems: 'center', gap: 15, padding: 10}}>
                {deps.length==0 ?
                    <BusExpression img='sad' msg='No departures for the next hour.' />
                :
                    <>{deps.map((dep, i) => { return <Departure key={i} dep={dep} loc={loc} />; })}</>
                }
            </ScrollView>
        }
    </>
    );
}



function Departure({dep, loc}) {
    const router = useRouter();

    const slmContext = useContext(StopListManagerContext);
    const stopsList = slmContext.slm.list;

    const point = findStopName(dep.stop_id, stopsList);

    const busData = {
        headsign: dep.headsign,
        color: dep.route.route_color,
        route_id: dep.route.route_id,
        vehicle_id: dep.vehicle_id,
        shape_id: dep.trip.shape_id,
        dir: dep.trip.direction
    }

    const stopData = {
        name: encodeStopName(point),
        latitude: loc.lat,
        longitude: loc.lon
    }

    return (
        <TouchableOpacity onPress={() => router.push(`/stop/route?stopDataParam=${JSON.stringify(stopData)}&busDataParam=${JSON.stringify(busData)}`)}>
            <IncomingBus point={point} dep={dep} />
        </TouchableOpacity>
    );
}



function OHeader({name, refreshView}: {name: string, refreshView: () => void}) {
    const navContex = useContext(NavContext);
    const router = useRouter();

    const goBack = () => router.navigate(calcBackLink(navContex.curr));
    
    return (
    <>
        <TopSafeArea />
        <View style={header_Styles.container}>
            <HeaderButton icon='chevron-back' onPress={goBack} />
            <Text numberOfLines={1} style={header_Styles.title}>{name}</Text>
            <HeaderButton icon='refresh' onPress={refreshView} />
        </View>
    </>
    );
}

function HeaderButton({icon, onPress}: {icon: string, onPress: () => void}) {
    return (
        <TouchableOpacity onPress={onPress}>
            <Ionicons name={icon as any} size={30} color={colorSelection.whiteSoft} />
        </TouchableOpacity>
    );
}

const header_Styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: colorSelection.bluePrimary,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    title: {
        width: '80%',
        fontSize: 25,
        textAlign: 'center',
        color: 'white',
    },
});