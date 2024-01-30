import { useState } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import SafeArea from '@components/SafeArea';
import { FavoritesManagerProvider } from '@util/favorites/FavoritesManagerContext';

import nav_Styles from '@styles/Nav';
import colorSelection from '@styles/Colors';

import AllStops from '@screens/AllStops';
import Nearby from '@screens/Nearby';
import Favorites from '@screens/Favorites';
import TripPlanner from '@screens/TripPlanner';
import Map from '@screens/Map';

import AllStopsSrc from '@assets/allstops.png';

import { registerRootComponent } from 'expo';



export default function Nav() {
    const [selection, setSelection] = useState(0);

    return (
        <SafeAreaProvider>
        <SafeArea>
            <View style={{flex: 1, backgroundColor: colorSelection.whiteSoft}}>
                <FavoritesManagerProvider>
                    {(0==selection) ? <AllStops /> : <></>}
                    {(1==selection) ? <Nearby /> : <></>}
                    {(2==selection) ? <Favorites /> : <></>}
                    {(3==selection) ? <TripPlanner /> : <></>}
                    {(4==selection) ? <Map /> : <></>}
                </FavoritesManagerProvider>
            </View>
            <NavBar selection={selection} setSelection={setSelection} />
        </SafeArea>
        </SafeAreaProvider>
    );
}



function NavBar({ selection, setSelection }) {
    const screenIcons = [
        {img: AllStopsSrc, title: 'All Stops'},
        {img: AllStopsSrc, title: 'Nearby'},
        {img: AllStopsSrc, title: 'Favorites'},
        {img: AllStopsSrc, title: 'Planner'},
        {img: AllStopsSrc, title: 'Map'},
    ];

    return (
        <View style={nav_Styles.bar}>
            { screenIcons.map((icon, i) => {
                return (
                    <TouchableOpacity key={i} onPress={() => setSelection(i)}>
                        <NavItem selected={selection==i} icon={icon} />
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}



function NavItem({ icon, selected }) {
    const color = selected ? colorSelection.bluePrimary : colorSelection.orangePrimsary;

    return (
        <View style={[ nav_Styles.item, {backgroundColor: color} ]}>
            <Image style={{width: 50, height: 50}} source={icon.img} />
            <Text style={nav_Styles.itemTitle}>{icon.title}</Text>
        </View>
    );
}



registerRootComponent(Nav);