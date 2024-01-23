import { Slot } from 'expo-router';
import { View, Text } from "react-native";
import { FavoritesManagerProvider } from '@util/favorites/FavoritesManagerContext';


export default function Layout() {
    return (
        <View>
            <FavoritesManagerProvider>
                <Slot />
            </FavoritesManagerProvider>
        </View>
    );
}