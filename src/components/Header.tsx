import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons,  } from '@expo/vector-icons';

import header_styles from '@styles/Header';
import colorSelection from '@styles/Colors';

import TopSafeArea from './safearea/Top';



interface ButtonType {
    icon: keyof typeof Ionicons.glyphMap,
    onPress: () => void;
}

interface HeaderType {
    title: string,
    leftButton?: ButtonType,
    rightButton?: ButtonType
}

function Header({title, leftButton, rightButton}: HeaderType) {
    return (
    <>
        <TopSafeArea />
        <View style={header_styles.container}>
            {(leftButton!=null) && <TouchableOpacity style={header_styles.leftButton} onPress={leftButton.onPress}>
                <Ionicons name={leftButton.icon} size={30} color={colorSelection.whiteSoft} />
            </TouchableOpacity>}

            <Text numberOfLines={1} style={header_styles.title}>{title}</Text>

            {(rightButton!=null) && <TouchableOpacity style={header_styles.rightButton} onPress={rightButton.onPress}>
                <Ionicons name={rightButton.icon} size={30} color={colorSelection.whiteSoft} />
            </TouchableOpacity>}
        </View>
    </>
    );
}



export { Header, HeaderType, ButtonType as HeaderButtonType }