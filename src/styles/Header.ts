import { StyleSheet } from 'react-native';
import colorSelection from './Colors';



const header_styles = StyleSheet.create({
    container: {
        position: 'relative',
        padding: 15,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: colorSelection.bluePrimary,
    },
    title: {
        width: '80%',
        fontSize: 30,
        textAlign: 'center',
        color: colorSelection.whiteSoft
    },
    leftButton: {
        position: 'absolute',
        top: '50%',
        left: 20,
    },
    rightButton: {
        position: 'absolute',
        top: '50%',
        right: 20,
    }
});



export default header_styles