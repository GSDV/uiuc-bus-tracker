import * as Notifications from 'expo-notifications';



const askPerimssions = async () => {
    const { status: existingStatus }  = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
    }

    if (finalStatus !== 'granted') {
        alert('Notification permissions not granted.');
        return false;
    }
    return true
}



const setBusNotification = async (bus: string, arrival: Date) => {
    const granted = await askPerimssions();
    if (!granted) return;

    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: true,
            shouldSetBadge: true
        })
    });

    // Calculate how many seconds into the future to display notification
    const dateNow = new Date();
    const seconds = ((arrival.getTime() - dateNow.getTime()) / 1000) - 30;
    if (seconds <= 0) return;

    Notifications.scheduleNotificationAsync({
        content: { title: 'Bus incoming!', body: `The ${bus} is arriving.` },
        trigger: { seconds: seconds }
    });
}



export { setBusNotification };