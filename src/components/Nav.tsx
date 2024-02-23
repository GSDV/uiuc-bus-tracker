import { useContext } from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import { useRouter } from 'expo-router';

import { NavContext } from '@util/contexts/nav/NavContext';

import colorSelection from '@styles/Colors';
import nav_styles from '@styles/Nav';

import SafeArea from '@components/safearea/Full';

import AllStopsSrc from '@assets/nav/all-stops.png';
import NearbySrc from '@assets/nav/nearby.png';
import FavoriteSrc from '@assets/nav/favorites.png';
import TripPlannerSrc from '@assets/nav/trip-planner.png';
import MapSrc from '@assets/nav/map.png';



export default function Nav({children}) {
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
    const navContext = useContext(NavContext);
    const router = useRouter();

    const navScreens = [
        {img: AllStopsSrc, title: 'Stops', link: '/nav/all-stops'},
        {img: NearbySrc, title: 'Nearby', link: '/nav/nearby'},
        {img: FavoriteSrc, title: 'Favorites', link: '/nav/favorites'},
        {img: TripPlannerSrc, title: 'Planner', link: '/nav/trip-planner'},
        {img: MapSrc, title: 'Map', link: '/nav/map'}
    ];

    const setScreen = (i) => {
        navContext.updateCurr(i);
        router.replace(navScreens[i].link);
    }

    return (
        <View style={nav_styles.bar}>
            { navScreens.map((screen, i) => {
                return <NavItem key={i} screen={screen} selected={navContext.curr==i} setScreen={() => setScreen(i)} />;
            })}
        </View>
    );
}



interface NavItemType {
    screen: {
        img: any,
        title: string,
        link: string
    },
    selected: boolean,
    setScreen: () => void
}
function NavItem({screen, selected, setScreen}: NavItemType) {
    const opacity = (selected) ? 1 : 0.5;

    return (
        <TouchableOpacity style={[ nav_styles.item, {opacity: opacity} ]} onPress={setScreen}>
            <Image style={{width: 60, height: 60}} source={screen.img} />
            <Text style={nav_styles.itemTitle}>{screen.title}</Text>
        </TouchableOpacity>
    );
}