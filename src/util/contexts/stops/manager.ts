import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchAllStops } from '@util/bus-lib/stops';



interface StopListType {
    stop_id: string,
    stop_name: string,
    code: string,
    distance: number,
    stop_points: {
        code: string,
        stop_id: string,
        stop_lat: number,
        stop_lon: number,
        stop_name: string,
    }[]
}


export default class StopListManager {
    list: StopListType[];
    changeset_id: string;


    constructor(arr) {
        this.list = arr;
    }


    async retrieve() {
        try {
            const csiString = await AsyncStorage.getItem('changeset_id');
            this.changeset_id = (csiString!=null) ? csiString : '';
            console.log('Retrieved changeset_id:', this.changeset_id);
        } catch(err) {
            console.error('Error retrieving changeset_id:', err);
        }

        const data = await fetchAllStops(this.changeset_id);

        // API rate limit reached
        if (data.status.code==403) {
            this.list = [];
            return;
        }

        // If we are getting new data:
        if (data.new_changeset) {
            this.changeset_id = data.changeset_id;
            this.list = data.stops;
            console.log('Retrieved new stop list array and changeset_id:', this.list.length);
            this.save();
        }
        // If our old data is still good:
        else {
            try {
                const stopListString = await AsyncStorage.getItem('stopListArray');
                this.list = JSON.parse(stopListString);
                console.log('Retrieved stop list array:', this.list.length);
            } catch(err) {
                console.error('Error retrieving stop list array:', err);
            }
        }
    }


    async save() {
        try {
            const stopListString = JSON.stringify(this.list);
            await AsyncStorage.setItem('stopListArray', stopListString);
            await AsyncStorage.setItem('changeset_id', this.changeset_id);
            console.log('Stop list array stored successfully.');
        } catch (err) {
            console.error('Error storing stop list array:', err);
        }
    }
}