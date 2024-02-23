import { ScrollView, Touchable } from 'react-native';
import { useRouter } from 'expo-router';
import IncomingBus from '@components/bus/IncomingBus';



export default function ArrivalsList(stop, deps) {
    return (
        <ScrollView style={{padding: 10}}>
            <Arrivals stop={stop} deps={deps} />
        </ScrollView>
    );
}



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