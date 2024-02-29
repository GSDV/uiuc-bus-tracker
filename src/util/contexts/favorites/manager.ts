import AsyncStorage from '@react-native-async-storage/async-storage';


// maybe make this StopListType from stops manager
interface FavoritesType {
    stop_id: string,
    stop_name: string,
    loc: {
        lat: number,
        lon: number
    }
}

export default class FavoritesManager {
    // Array of MTD Bus Stop IDs
    favorites: FavoritesType[];

    constructor(arr) {
        this.favorites = arr;
    }


    async retrieve() {
        this.favorites = [];
        try {
            const favoritesString = await AsyncStorage.getItem('favoritesArray');
            this.favorites = JSON.parse(favoritesString ?? '[]');
            console.log('Retrieved favorites array:', this.favorites.length);
        } catch(err) {
            console.error('Error retrieving favorites array:', err);
        }
    }


    async save() {
        try {
            const favoritesString = JSON.stringify(this.favorites);
            await AsyncStorage.setItem('favoritesArray', favoritesString);
            console.log('Favorites array stored successfully.');
        } catch (err) {
            console.error('Error storing favorites array:', err);
        }
    }


    addFavorite({stop_id, stop_name, loc}) {
        this.favorites.push({stop_id: stop_id, stop_name: stop_name, loc: loc});
        this.save();
    }


    removeFavorite(id: string) {
        this.favorites = this.favorites.filter(stop => stop.stop_id != id);
        this.save();
    }


    isFavorited(id: string) {
        return this.favorites.some(stop => stop.stop_id === id);
    }
}
