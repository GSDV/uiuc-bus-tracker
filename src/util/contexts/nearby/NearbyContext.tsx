import { createContext, useState, useEffect } from 'react';
import { getNearbyStops } from '@util/bus-lib/nearby';
import { getUserLocation } from '@util/location';



const NearbyContext = createContext({stops: [], successful: false, isLoading: true, outOfBounds: false, refreshLocation: ()=>{}});

const NearbyProvider = (prop) => {
    const [refresh, refresher] = useState(false);
    const refreshLocation = () => {
        refresher(!refresh);
    }

    const [isLoading, setIsLoading] = useState(true);
    const [successful, setSuccessful] = useState(false);
    const [outOfBounds, setOutOfBounds] = useState(false);
    const [stops, setStops] = useState([]);


    useEffect(() => {
        const init = async () => {
            setIsLoading(true);
            setSuccessful(false);
            setOutOfBounds
            const res = await getUserLocation();

            if (res.status==200) {
                if (res.loc.lat>=40.2 || res.loc.lat<=39.9 || res.loc.lon>=-88.0 || res.loc.lon<=-88.4) {
                    console.log('User out of bounds: ', res.loc);
                    setOutOfBounds(true);
                } else {
                    const nearbyStops = await getNearbyStops(res.loc);
                    setStops(nearbyStops);
                    setSuccessful(true);
                }
            }
            setIsLoading(false);
        }
        init();
    }, [refresh]);


    return (
        <NearbyContext.Provider value={{ stops, successful, isLoading, outOfBounds, refreshLocation }}>
            {prop.children}
        </NearbyContext.Provider>
    );
};

export { NearbyContext, NearbyProvider };