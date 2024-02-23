import { StyleSheet } from 'react-native';
import colorSelection from '@styles/Colors';

const stop_Styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        paddingHorizontal: 30,
        backgroundColor: colorSelection.orangeSecondary,
        borderRadius: 15,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    text: {
        width: '80%',
        fontSize: 18,
        color: colorSelection.whiteSoft,
    }
});

export default stop_Styles;