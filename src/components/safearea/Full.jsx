import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import colorSelection from '@styles/Colors';



export default function SafeArea({ children }) {
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: colorSelection.bluePrimary}}>
            <View style={{flex: 1}}>
                {children}
            </View>
        </SafeAreaView>
    );
}