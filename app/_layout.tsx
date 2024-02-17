import { Slot } from 'expo-router';
import { StopListManagerProvider } from '@util/contexts/stops/StopListContext';
import { FavoritesManagerProvider } from '@util/contexts/favorites/FavoritesManagerContext';
import { NearbyProvider } from '@util/contexts/nearby/NearbyContext';
import { NavProvider } from '@util/contexts/nav/NavContext';



// Contexts for the app.
// No visual components here.
export default function Layout() {
    return (
        <StopListManagerProvider>
        <NavProvider>
        <FavoritesManagerProvider>
        <NearbyProvider>
            <Slot />
        </NearbyProvider>
        </FavoritesManagerProvider>
        </NavProvider>
        </StopListManagerProvider>
    );
}