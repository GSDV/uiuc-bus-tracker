import { StyleSheet } from 'react-native'; 

const ib_Styles = StyleSheet.create({
    item: {
        borderRadius: 20,
        flexDirection: 'row',
        overflow: 'hidden'
    },
    routeColor: {
        width: '2%'
    },
    info: {
        width: '99%',
        display: 'flex',
        flexDirection: 'column'
    },
    infoSections: {
        padding: '5px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
});

export default ib_Styles;