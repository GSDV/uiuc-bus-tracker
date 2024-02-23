import { useEffect, useState, useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

import { getItineraries, isWalkComponentEnd } from '@util/bus-lib/itineraries';

import { NavContext } from '@util/contexts/nav/NavContext';
import { calcBackLink } from '@util/calcBack';

import plan_styles from '@styles/Plan';

import { Header, HeaderButtonType } from '@components/Header';
import { BusExpression, BusExpressionType } from '@components/BusExpression';

import ArrowSrc from '@assets/arrow.png';



export default function Plan() {
    const { originParam, destinationParam } = useLocalSearchParams();
    const origin = JSON.parse(originParam as any)
    const destination = JSON.parse(destinationParam as any);

    const [itineraries, setItineraries] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const [busExpression, setBusExpression] = useState<BusExpressionType>({img: 'loading', msg: ''});

    const init = async () => {
        const res = await getItineraries(origin, destination);
        if (res.code==500) {
            setBusExpression({
                img: 'dead',
                msg: 'There was a server error. Please try again later'
            });
        }
        if (res.code==455) {
            setBusExpression({
                img: 'confused',
                msg: res.msg
            });
        }

        setItineraries(res.itineraries);
        setLoading(false);
    }

    useEffect(() => {
        init();
    }, []);

    return (
        <View style={plan_styles.container}>
            <PlanHeader />
            {(loading) && <BusExpression img='loading' msg='Loading itineraries...' />}
            {(!loading && itineraries.length==0) && <BusExpression img={busExpression.img} msg={busExpression.msg} />}
            {(!loading && itineraries.length!=0) && <Itineraries itineraries={itineraries} />}
        </View>
    );
}



function PlanHeader() {
    const navContex = useContext(NavContext);
    const router = useRouter();
    const goBack = () => router.navigate(calcBackLink(navContex.curr));

    const leftButton: HeaderButtonType = {icon: 'chevron-back', onPress: goBack};

    return <Header title='Itineraries' leftButton={leftButton} />;
}




function Itineraries({itineraries}: {itineraries: any[]}) {
    const [num, setNum] = useState<number>(0);

    return (
    <>
        <ChooseItinerary itineraries={itineraries} setItineraryNumber={setNum}  />
        <Itinerary itinerary={itineraries[num]} />
    </>
    );
}




function Minimize() {
    return (
        <></>
    );
}



interface ChooseItineraryType {
    itineraries: any[],
    setItineraryNumber: React.Dispatch<React.SetStateAction<number>>,
}
function ChooseItinerary({itineraries, setItineraryNumber}: ChooseItineraryType) {
    return (
        <View style={plan_styles.choose}>
            <Text style={plan_styles.chooseText}>Itineraries: </Text>

            <View style={plan_styles.chooseOptions}>
                {itineraries.map((itin, i) => (
                    <TouchableOpacity key={i} style={plan_styles.chooseOption} onPress={() => setItineraryNumber(i)}>
                            <Text style={{fontSize: 20, textAlign: 'center'}}>{i+1}</Text>
                    </TouchableOpacity>
                ))}
            </View>


            
        </View>
    );
}



function Itinerary({itinerary}: {itinerary: any}) {
    return (
        <ScrollView contentContainerStyle={plan_styles.itineraryContainer}>
            <Time key='time' time={itinerary.travel_time} />
            {itinerary.legs.map((leg, i) => {
                return (
                    <ItineraryItem key={i} leg={leg} isLast={itinerary.legs.length-1==i} />
            )})}
        </ScrollView>
    );
}



function Time({time}: {time: string}) {
    return (
        <View style={plan_styles.time}>
            <Text style={plan_styles.text}>{time} minutes.</Text>
        </View>
    );
}



/**
 * MTD API "leg" can consist of one walk component, or multiple service components.
 * So we need to iterate through all service components to display them.
 */
function ItineraryItem({leg, isLast}: {leg: any, isLast: boolean}) {
    if (leg.type=='Walk') {
        return (
            <>
                <WalkComponent walk={leg.walk} />
                {!isLast && <Arrow />}
            </>
        );
    }
    else if (leg.type=='Service') {
        return (
            <>{leg.services.map((s, i) => (<>
                    <ServiceComponent key={i} service={s} />
                    {!isLast && <Arrow />}
            </>))}</>
        )
    }
    // Shouldn't happen, but just in case:
    return <></>;
}



function WalkComponent({walk}: {walk: any}) {
    const dest = isWalkComponentEnd(walk.end.name) ? 'destination' : walk.end.name;
    return (
        <View style={[plan_styles.component, plan_styles.walk]}>
            <Text style={plan_styles.text}>Walk to {dest}.</Text>
        </View>
    );
}



function ServiceComponent({service}) {
    return (
        <View style={[plan_styles.component, plan_styles.service]}>
            <Text style={plan_styles.text}>{service.begin.name} to {service.end.name} by the {service.route.route_short_name} {service.route.route_long_name}.</Text>
        </View>
    );
}



function Arrow() {
    return <Image style={{width: 50, height: 50}} source={ArrowSrc} />;
}