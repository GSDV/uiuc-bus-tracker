import { ScrollView, Touchable } from 'react-native';
import IncomingBus from '@components/bus/IncomingBus';
import { useRouter } from 'expo-router';



export default function ArrivalsList(stop, deps) {
    return (
        <ScrollView style={{padding: 10}}>
            <Arrivals stop={stop} deps={deps} />
        </ScrollView>
    );
}


/**
 * Creates all bus arrivals for a given stop.
 * @param {JSON} stop - Parent stop
 * @param {array} deps - All incoming departures from a stop
 * @returns {JSX} - JSX list of all incomoing departures
 */
function Arrivals({stop, deps}) {
    const router = useRouter();

    const arrivalsJSX = deps.map(dep => {
        for (let i=0; i<stop.points.length; i++) {
            if (dep.stop_id==p.id) {
                return (
                    <Touchable onPress={() => router.push({ pathname: "/route-map/", params: {stop_id: dep.stop_id, dep: dep} })}>
                        <IncomingBus  />
                    </Touchable>
                );
            }
        }
    });

    return ({arrivalsJSX});
}