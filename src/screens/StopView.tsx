import { useEffect, useState, useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter, useGlobalSearchParams } from 'expo-router';

import { fetchStopDepartures } from '@util/bus-lib/stop';
import { findStopName, encodeStopName } from '@util/bus-lib/name';
import { calcBackLink } from '@util/calcBack';

import { NavContext } from '@util/contexts/nav/NavContext';
import { StopListManagerContext } from '@util/contexts/stops/StopListContext';

import { Header, HeaderButtonType } from '@components/Header';
import IncomingBus from '@components/bus/IncomingBus';
import { BusExpression } from '@components/BusExpression';



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