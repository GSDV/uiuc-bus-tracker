import React, { useEffect, useState, useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

import { getItineraries, isWalkComponentEnd, MinimizeType } from '@util/bus-lib/itineraries';

import { NavContext } from '@util/contexts/nav/NavContext';
import { calcBackLink } from '@util/calcBack';

import plan_styles from '@styles/Plan';

import { Header, HeaderButtonType } from '@components/Header';
import { BusExpression, BusExpressionType } from '@components/BusExpression';

import ArrowSrc from '@assets/arrow.png';
import colorSelection from '@styles/Colors';



export default function Plan() {
    const { originParam, destinationParam } = useLocalSearchParams();
    const origin = JSON.parse(originParam as any)
    const destination = JSON.parse(destinationParam as any);

    const [itineraries, setItineraries] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const [busExpression, setBusExpression] = useState<BusExpressionType>({img: 'loading', msg: ''});


    const [minimize, setMinimize] = useState<MinimizeType>('time');
    const changeMinimize = (m: MinimizeType) => {
        setMinimize(m);
        init();
    }


    const init = async () => {
        setItineraries([]);
        setLoading(true);

        const res = await getItineraries(origin, destination, minimize);
        if (res.code==500) {
            setBusExpression({
                img: 'dead',
                msg: res.msg
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
            {(!loading && itineraries.length!=0) && <Itineraries itineraries={itineraries} minimize={minimize} changeMinimize={changeMinimize} />}
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



function Itineraries({itineraries, minimize, changeMinimize}: {itineraries: any[], minimize: MinimizeType, changeMinimize: (m: MinimizeType) => void}) {
    const [num, setNum] = useState<number>(0);

    return (
    <>
        <Minimize minimize={minimize} changeMinimize={changeMinimize} />
        {(itineraries.length>1) && <ChooseItinerary itineraries={itineraries} num={num} setItineraryNumber={setNum}  />}
        <Itinerary itinerary={itineraries[num]} />
    </>
    );
}



interface ChooseMinimizeType {
    minimize: MinimizeType,
    changeMinimize: (m: MinimizeType) => void
}
function Minimize({minimize, changeMinimize}: ChooseMinimizeType) {
    const options: {title: string, data: MinimizeType}[] = [
        {title: 'Time', data: 'time'},
        {title: 'Walking', data: 'walking'},
        {title: 'Transfers', data: 'transfers'},
    ];

    return (
        <View style={plan_styles.minimize}>
            <Text style={plan_styles.minimizeText}>Minimize: </Text>
            {options.map((option, i) => (
                    <TouchableOpacity key={`min-option-${i}`} onPress={() => changeMinimize(option.data)}>
                        {(option.data==minimize) ? 
                            <Text style={[ plan_styles.minimizeOption, {backgroundColor: colorSelection.orangeSecondary } ]}>{option.title}</Text>
                        :
                            <Text style={plan_styles.minimizeOption}>{option.title}</Text>
                        }
                    </TouchableOpacity>
                
            ))}
        </View>
    );
}



interface ChooseItineraryType {
    itineraries: any[],
    num: number,
    setItineraryNumber: React.Dispatch<React.SetStateAction<number>>,
}
function ChooseItinerary({itineraries, num, setItineraryNumber}: ChooseItineraryType) {
    return (
        <View style={plan_styles.choose}>
            <Text style={plan_styles.chooseText}>Itineraries: </Text>

            <View style={plan_styles.chooseOptions}>
                {itineraries.map((itin, i) => {
                    const color = (i==num) ? colorSelection.orangeSecondary : '#adadad';
                    return (
                        <TouchableOpacity key={i} style={[ plan_styles.chooseOption, {backgroundColor: color} ]} onPress={() => setItineraryNumber(i)}>
                                <Text style={{fontSize: 20, textAlign: 'center'}}>{i+1}</Text>
                        </TouchableOpacity>
                    );
                })}
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
                    <ItineraryItem key={`${i}-${JSON.stringify(leg)}`} leg={leg} isLast={itinerary.legs.length-1==i} />
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
            <React.Fragment key={`walk-${JSON.stringify(leg.walk)}`}>
                <WalkComponent walk={leg.walk} />
                {!isLast && <Arrow />}
            </React.Fragment>
        );
    }
    else if (leg.type=='Service') {
        return (
            <React.Fragment key={`service-${JSON.stringify(leg.services)}`}>
                {leg.services.map((s, i) => (
                <React.Fragment key={`service-${JSON.stringify(s)}`}>
                    <ServiceComponent service={s} />
                    {!isLast && <Arrow />}
                </React.Fragment>
            ))}
            </React.Fragment>
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