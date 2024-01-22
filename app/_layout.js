import { Slot } from 'expo-router';
import { View, Text } from "react-native";
// import { ProjectManagerProvider } from '@util/project-lib/ProjectManagerContext';
// import { ThemeProvider } from '@util/settings/ThemeContext';
// import { ColorProvider } from '@util/settings/ColorContext';



export default function Layout() {
    return (
        <View>
            <Text>AAA</Text>
            <Text>AAA</Text>
            <Text>AAA</Text>
            <Text>AAA</Text>
            <Text>AAA</Text>
            <Slot />
        </View>
    );
}