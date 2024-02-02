import { Text } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';



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
    
    return <Text>Loading</Text>;
}