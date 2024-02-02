import { Slot } from 'expo-router';
import { FavoritesManagerProvider } from '@util/favorites/FavoritesManagerContext';



// Contexts for the app.
// No real layout here.
export default function Layout() {
    return (
        <FavoritesManagerProvider>
            <Slot />
        </FavoritesManagerProvider>
    );
}