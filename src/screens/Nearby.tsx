import { useEffect, useContext } from 'react';
import { View } from 'react-native';

import { NearbyContext } from '@util/contexts/nearby/NearbyContext';

import { Header } from '@components/NavHeader';
import StopsList from '@components/stops/StopsList';
import { BusExpression } from '@components/BusExpression';



export default function Nearby() {
    const nearbyContext = useContext(NearbyContext);

    useEffect(() => {
        nearbyContext.refreshLocation();
    }, []);

    return (
        <View style={{flex: 1}}>
            <Header title='Nearby' />
            {nearbyContext.isLoading ? 
                <BusExpression img='loading' msg='Fetching nearby stops...'/>
            :
                <NearbyContent nearbyContext={nearbyContext} />
            }
        </View>
    );
}



function NearbyContent({nearbyContext}) {
    return (
    <>
        {(!nearbyContext.successful) && <BusExpression img='sad' msg='Please turn on location.' />}
        {(nearbyContext.successful && nearbyContext.outOfBounds) && <BusExpression img='confused' msg='You are too far away from the Champaign-Urbana area.' />}
        {(nearbyContext.successful && !nearbyContext.outOfBounds) && <StopsList list={nearbyContext.stops} /> }
    </>
    );
}