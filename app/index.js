import { useEffect } from 'react';
import { View, Text } from 'react-native';

export default function App() {
    const callAsyncFetch = async () => {
        console.log('start fetch');
        const res = await fetch('https://jsonplaceholder.typicode.com/todos/6');
        // const res = await fetch("https://developer.cumtd.com/api/v2.2/json/getstops?key=fa2d90a648c5460cb84383653e10d578");
        const data = await res.json();
        console.log('end fetch');
        console.log(data);
    }
    useEffect(() => {
        callAsyncFetch();
    }, []); 

    return (
        <View>
            <Text>Test</Text>
            <Text>Test</Text>
            <Text>Test</Text>
            <Text>Test</Text>
        </View>
    )
}