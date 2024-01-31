import { useState } from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import SafeArea from '@components/SafeArea';

import nav_Styles from '@styles/Nav';
import colorSelection from '@styles/Colors';

import AllStopsSrc from '@assets/allstops.png';

import { useRouter } from 'expo-router';

import { useSafeAreaInsets, SafeAreaView } from 'react-native-safe-area-context';



export default function Nav({ children }) {

    return (
        <SafeArea>
            <View style={{flex: 1, backgroundColor: colorSelection.whiteSoft}}>
                {children}
            </View>
            <NavBar />
        </SafeArea>
    );
}



function NavBar() {
    const router = useRouter();

    const screenIcons = [
        {img: AllStopsSrc, title: 'All Stops', link: '/nav/stops'},
        {img: AllStopsSrc, title: 'Nearby', link: '/nav/'},
        {img: AllStopsSrc, title: 'Favorites', link: '/nav/'},
        {img: AllStopsSrc, title: 'Planner', link: '/nav/'},
        {img: AllStopsSrc, title: 'Map', link: '/nav/'}
    ];

    return (
        <View style={nav_Styles.bar}>
            { screenIcons.map((icon, i) => {
                return (
                    <TouchableOpacity key={i} onPress={() => router.push(icon.link)}>
                        <NavItem icon={icon} />
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}



function NavItem({ icon }) {
    // const color = selected ? colorSelection.bluePrimary : colorSelection.orangePrimary;
    const color = colorSelection.bluePrimary;

    return (
        <View style={[ nav_Styles.item, {backgroundColor: color} ]}>
            <Image style={{width: 50, height: 50}} source={icon.img} />
            <Text style={nav_Styles.itemTitle}>{icon.title}</Text>
        </View>
    );
}


