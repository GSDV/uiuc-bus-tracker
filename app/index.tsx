import { View } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';

import { BusExpression } from '@components/BusExpression';



/**
 * What is going on here?
 * 
 * Check out the README.md, "Why aren't you using registerRootComponent?" part.
 */
export default function App() {
    const router = useRouter();

    useFocusEffect(() => {
        router.replace('/nav/all-stops');
    });
    
    return (
        <View style={{flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <BusExpression img='loading' msg='Loading...' />
        </View>
    );
}