import { StyleSheet } from 'react-native';
import colorSelection from '@styles/Colors';



const tripPlanner_styles = StyleSheet.create({
    instrContainer: {
        position: 'absolute',
        top: 20,
        left: '50%',
        transform: [{translateX: -100}],
        padding: 20,
        width: 200,
        backgroundColor: 'white',
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'column'
    },
    instrText: {
        fontSize: 15,
        textAlign: 'center'
    },

    instrButtonContainer: {
        position: 'absolute',
        bottom: 40,
        padding: 10,
        paddingHorizontal: 20,
        backgroundColor: colorSelection.bluePrimary,
        borderRadius: 20
    },
    instrButtonText: {
        fontSize: 20,
        color: colorSelection.whiteSoft,
        textAlign: 'center'
    },

    errButton: {
        position: 'absolute',
        left: '50%',
        bottom: 40,
        transform: [{translateX: -100}],
        padding: 20,
        width: 200,
        backgroundColor: 'red',
        borderRadius: 20,
        zIndex: 60
    },
    errText: {
        fontSize: 15,
        color: colorSelection.whiteSoft,
        textAlign: 'center'
    }
});



export default tripPlanner_styles;