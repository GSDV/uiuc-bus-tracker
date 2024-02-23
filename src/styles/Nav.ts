import { StyleSheet } from 'react-native';
import colorSelection from '@styles/Colors';



const nav_styles = StyleSheet.create({
    bar: {
        padding: 0,
        backgroundColor: colorSelection.bluePrimary,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    item: {
        padding: 10,
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    itemTitle: {
        fontSize: 13,
        textAlign: 'center',
        color: colorSelection.whiteSoft
    }
});



export default nav_styles;