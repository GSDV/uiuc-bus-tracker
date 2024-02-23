import { View, Text } from 'react-native';

import header_styles from '@styles/Header';



function Header({title}: {title: string}) {
    return (
        <View style={header_styles.container}>
            <Text numberOfLines={1} style={header_styles.title}>{title}</Text>
        </View>
    );
}



export { Header }