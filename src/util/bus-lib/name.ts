function findStopName(stop_id: string, stopsCopy: any[]) {
    const stopsList = [...stopsCopy];
    const group_stop_target = stop_id.split(':')[0];

    for (let i=0; i<stopsList.length; i++) {
        if (stopsList[i].stop_id != group_stop_target) continue;
        const point_stops = stopsList[i].stop_points;

        for (let j=0; j<point_stops.length; j++) {
            if (point_stops[j].stop_id == stop_id) {
                return point_stops[j].stop_name;
            }
        }

    }

    return '';
}



function encodeStopName(stopName) {
    const defaultEncoding = encodeURIComponent(stopName);

    const replacedOpening = defaultEncoding.replace(new RegExp('\\(', 'g'), '%28');
    const replacedClosing = replacedOpening.replace(new RegExp('\\)', 'g'), '%29');

    return replacedClosing;
}



export { findStopName, encodeStopName };