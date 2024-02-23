import * as Location from 'expo-location';



const getUserLocation = async () => {
    const res = {
        status: 200,
        msg: 'Success',
        loc: { lat: 0, lon: 0 }
    };

    try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            res.status = 400;
            res.msg = 'Permission to access location was denied.';
            return res;
        }

        let location = await Location.getCurrentPositionAsync({accuracy: 6});
        res.loc.lat = location.coords.latitude;
        res.loc.lon = location.coords.longitude;
    } catch (err) {
        console.log(err)
        const { code, message } = err;
        res.status = 400;
        res.msg = message;
    }

    return res;
}



export { getUserLocation };