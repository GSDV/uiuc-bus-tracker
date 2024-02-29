import { StyleSheet } from 'react-native'; 



const ib_Styles = StyleSheet.create({
    item: {
        borderRadius: 10,
        display: 'flex',
        gap: 5,
        flexDirection: 'row',
        overflow: 'hidden',
        width: '95%'
    },
    routeColor: {
        width: '5%'
    },
    info: {
        padding: 5,
        width: '95%',
        display: 'flex',
        flexDirection: 'column',
        gap: 5
    },
    infoSection: {
        padding: 2,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    headsignText: {
        fontSize: 22,
        fontWeight: 'bold'
    },
    destinationText: {
        fontSize: 18,
        fontStyle: 'italic'
    },
    pointName: {
        width: '60%',
        fontSize: 20
    },
    arrivalTime: {
        fontSize: 18
    }
});



export default ib_Styles;