import ib_Styles from '@styles/IncomingBus';

/**
 * Given a stop and a departure from that stop, 
 * @param {JSON} stop - Child stop JSON, not to be confused with parent stop
 * @param {JSON} dep - Point stop departure JSON
 * @returns {JSX} The JSX for the corresponding arrival
 */
export default function IncomingBus({point, dep}) {
    const color = dep.route.route_color;
    const dist = parseInt(getSLD(dep.location.lat, dep.location.lon, point.lat, point.lon));

    return (
        <div style={[ib_Styles.item , {border: `1px solid ${color}`}]}>
            <div style={[ ib_Styles.routeColor, {backgroundColor: color}]}></div>
            <div style={ib_Styles.info}>
                <div style={ib_Styles.infoSections}>
                    <IBHeadsign headsign={dep.headsign} dest={dep.trip.trip_headsign} />
                    <h4>{point.name}</h4> 
                </div>
                <div style={ib_Styles.infoSections}>
                    <IBDistance exp_min={dep.expected_mins} dist={dist}/>
                    <IBTime exp_min={dep.expected_mins} exp_time={dep.expected} />
                </div>
            </div>
        </div>
    );
}



function IBHeadsign({headsign, dest}) {
    // headsign - fontweight 700
    // dest - style="font-weight: 200;" <i>
    return (
        <span><h1>{headsign}</h1><h3> to {dest}</h3></span>
    );
}


// Which child stop the bus will arrive at
// if there are no child stops, defaults to the "parent" single stop
function IBChildStop(stop) {
    return (
        <h4>{stop}</h4>
    );
}


/**
 * Get the bus distance element
 * @param {int} exp_min - Amount of minutes the bus will arrive in, according to MTD API
 * @param {int} dist - How far away the bus is (in meters) from the stop, according to MTD API
 * @returns {JSX} Calulated distance bus is away from stop
 */
function IBDistance({exp_min, dist}) {
    // If the bus is more than 15 minutes away, innacurate distance info is presented (twisting routes).
    if (exp_min >= 15) return <h4>-</h4>;

    const dist_imperial = 0.621371 * dist; // Distance converted from metric to imperial
    if (dist >= 5280) return <h4>{dist_imperial/5280}mi</h4>;
    return <h4>{dist_imperial}ft</h4>;
}



/**
 * Get the properly formatted time element at which the bus will arrive at a stop
 * @param {Time} exp_time - Time the bus will arrive at (not to be confused with minutes until arrival) according to the MTD API
 * @param {Time} exp_min - Amount of minutes the bus will arrive in, according to MTD API
 * @returns {JSX} Representation of the time that the bus will arrive at
 */
function IBTime({exp_time, exp_min}) {
    if (exp_min==0) return <></>;

    const arrivalTime = new Date(exp_time);

    let hours = arrivalTime.getHours();
    let arrivalHours = (hours < 10) ? `0${hours}` : `${hours}`;
    let minutes = arrivalTime.getMinutes();
    let arrivalMinutes = (minutes < 10) ? `0${minutes}` : `${minutes}`;

    // style="font-weight: 300;"
    return <h4>{arrivalHours}:{arrivalMinutes}</h4>;
}




/**
* Calculates the distance between two lat/long coordinates
* @param {number} lat1 - Origin latitude
* @param {number} lon1 - Origin longitude
* @param {number} lat2 - Destination latitude
* @param {number} lon2 - Destination longitude
* @returns {number} The calculated straight-line distance between the points
*/
function getSLD(lat1, lon1, lat2, lon2) {
   // Use the haversine formula to calculate the straight-line distance
   // where "phi" is latitude, "lambda" is longitude, "radius" is earth’s radius (mean radius = 6,371km).
   // NOTE: Angles need to be in radians to pass to trig functions!
   // Adapted from https://www.movable-type.co.uk/scripts/latlong.html
   const radius = 6371000;
   const phi1 = lat1 * Math.PI/180;
   const phi2 = lat2 * Math.PI/180;
   const delta_phi = (lat2-lat1) * Math.PI/180;
   const delta_lambda = (lon2-lon1) * Math.PI/180;

   const alpha = Math.sin(delta_phi/2) * Math.sin(delta_phi/2) +
                       Math.cos(phi1) * Math.cos(phi2) *
                       Math.sin(delta_lambda/2) * Math.sin(delta_lambda/2);
   return radius * 2 * Math.atan2(Math.sqrt(alpha), Math.sqrt(1-alpha));
}

