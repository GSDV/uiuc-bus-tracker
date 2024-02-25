import { useContext } from 'react';
import { View } from 'react-native';

import { FavoriteManagerContext } from '@util/contexts/favorites/FavoritesManagerContext';

import { Header } from '@components/NavHeader';
import StopsList from '@components/stops/StopsList';
import { BusExpression } from '@components/BusExpression';



export default function Favorites() {
    const fmContext = useContext(FavoriteManagerContext);

    return (
        <View style={{flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
            <Header title='Favorites' />
            {(fmContext.fm.favorites.length==0) ? 
                <View style={{flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <BusExpression img='confused' msg='Add some favorites from "All Stops"'/>
                </View>
            :
                <StopsList key={fmContext.isLoading.toString()} list={fmContext.fm.favorites}/>
            }            
        </View>
    );
}