import { createContext, useState, useEffect } from 'react';
import { getNearbyStops } from '@util/bus-lib/nearby';
import { getUserLocation } from '@util/location';



const NearbyContext = createContext({stops: [], successful: false, isLoading: true, refreshLocation: ()=>{}});

const NearbyProvider = (prop) => {
    const [refresh, refresher] = useState(false);
    const refreshLocation = () => refresher(!refresh);

    const [isLoading, setIsLoading] = useState(true);
    const [successful, setSuccessful] = useState(false);
    const [stops, setStops] = useState([]);


    useEffect(() => {
        const init = async () => {
            setIsLoading(true);
            setSuccessful(false);
            const res = await getUserLocation();

            if (res.status==200) {
                const nearbyStops = await getNearbyStops(res.loc);
                setStops(nearbyStops);
                setSuccessful(true);
            }
            setIsLoading(false);
        }
        init();
    }, [refresh]);


    return (
    <NearbyContext.Provider value={{ stops, successful, isLoading, refreshLocation }}>
        {prop.children}
    </NearbyContext.Provider>
    );
};

export { NearbyContext, NearbyProvider };