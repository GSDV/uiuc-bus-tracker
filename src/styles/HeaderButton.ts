import { StyleSheet } from 'react-native';
import colorSelection from '@styles/Colors';



const headerButton_styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        padding: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: colorSelection.bluePrimary,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
});



export default headerButton_styles;