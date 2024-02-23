import { View, Text } from 'react-native';
import ib_Styles from '@styles/IncomingBus';



export default function IncomingBus({dep, point}) {
    const color = dep.route.route_color;

    return (
        <View style={[ib_Styles.item , {borderColor: `#${color}`, borderWidth: 5}]}>
            <View style={[ ib_Styles.routeColor, {backgroundColor: `#${color}`}]}></View>
            <View style={ib_Styles.info}>
                <IBHeadsign headsign={dep.headsign} dest={dep.trip.trip_headsign} />
                <View style={ib_Styles.infoSection}>
                    <IBPointStop point={point}/>
                    <IBTime exp_min={dep.expected_mins} exp_time={dep.expected} />
                </View>
            </View>
        </View>
    );
}



function IBHeadsign({headsign, dest}: {headsign: string, dest: string}) {
    return (
        <Text>
            <Text style={ib_Styles.headsignText}>{headsign}</Text>
            <Text style={ib_Styles.destinationText}> to {dest}</Text>
        </Text>
    );
}



// Get the display name of the point stop.
// We have to iterate through all stops, and then all points of that stop.
// We can save some time by first checking for the group stop name.
function IBPointStop({point}: {point: string}) {
    return <Text style={ib_Styles.pointName} numberOfLines={1} adjustsFontSizeToFit>{point}</Text>;
}



function IBTime({exp_min, exp_time}) {
    const arrivalTime = new Date(exp_time);

    let hours = arrivalTime.getHours();
    let arrivalHours = (hours < 10) ? `0${hours}` : `${hours}`;
    let minutes = arrivalTime.getMinutes();
    let arrivalMinutes = (minutes < 10) ? `0${minutes}` : `${minutes}`;

    const arrivalCountdown = getArrivalCountdownText(exp_min);
    
    return (
        <Text style={ib_Styles.arrivalTime}>
            <Text>{arrivalCountdown} </Text>
            <Text>{`(${arrivalHours}:${arrivalMinutes})`}</Text>
        </Text>
    );
}



function getArrivalCountdownText(exp_min) {
    const textColor = getArrivalTextColor(exp_min);

    if (exp_min == 0) return <Text style={{color: textColor}}>due!</Text>;
    else if (exp_min == 1) return <Text style={{color: textColor}}>1 min!</Text>;
    else return <Text style={{color: textColor}}>{`${exp_min} mins`}</Text>;
}

function getArrivalTextColor(exp_min) {
    if (exp_min <= 2) return "#fe0000";
    else if (exp_min <= 5) return "#fe8800";
    else if (exp_min <= 10) return "#008800";
    return "#000000";
}