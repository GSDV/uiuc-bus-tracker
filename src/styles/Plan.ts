import { StyleSheet } from 'react-native';
import colorSelection from '@styles/Colors';



const plan_styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colorSelection.whiteSoft
    },

    minimize: {
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        backgroundColor: '#cccccc'
    },
    minimizeText: {
        fontSize: 20,
    },
    minimizeOption: {
        padding: 5,
        paddingHorizontal: 10,
        fontSize: 20,
        backgroundColor: '#adadad',
        borderRadius: 15,
        textAlign: 'center',
        overflow: 'hidden'
    },

    choose: {
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#cccccc'
    },
    chooseText: {
        fontSize: 20,
    },
    chooseOptions: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10
    },
    chooseOption: {
        width: 40,
        height: 40,
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: '#adadad',
        borderRadius: 50
    },

    itineraryContainer: {
        padding: 20,
        paddingBottom: 50,
        display: 'flex',
        alignItems: 'center',
        gap: 10
    },
    time: {
        marginBottom: 40,
        padding: 20,
        borderRadius: 20,
        borderWidth: 5,
        borderColor: 'black',
        backgroundColor: '#adadad'
    },
    component: {
        padding: 20,
        width: '80%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        borderWidth: 5,
        borderColor: 'black'
    },
    walk: { backgroundColor: colorSelection.componentOrange },
    service: { backgroundColor: colorSelection.componentBlue },
    text: {
        fontSize: 22,
        textAlign: 'center',
    }
});



export default plan_styles;