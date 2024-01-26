import AsyncStorage from '@react-native-async-storage/async-storage';



export default class FavoritesManager {
    // Array of MTD Bus Stop IDs
    favorites;

    constructor(arr) {
        this.favorites = arr;
    }


    async retrieve() {
        this.favorites = [];
        try {
            const favoritesString = await AsyncStorage.getItem('favoritesArray');
            this.favorites = JSON.parse(favoritesString ?? '[]');
            console.log('Retrieved favorites array:', this.favorites);
        } catch(err) {
            console.error('Error retrieving favorites array:', err);
        }
    }


    async save() {
        try {
            const favoritesString = JSON.stringify(this.favorites);
            await AsyncStorage.setItem("favoritesArray", favoritesString);
            console.log('Favorites array stored successfully.');
        } catch (err) {
            console.error('Error storing favorites array:', err);
        }
    }


    addFavorite(id) {
        this.projects.push(id);
        this.save();
    }


    removeFavorite(id) {
        this.favorites = this.favorites.filter(stop => stop !== id);
        this.save();
    }
}
