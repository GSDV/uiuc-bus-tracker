import { createContext, useState, useEffect } from 'react';
import FavoritesManager from '@util/contexts/favorites/manager';



const FavoriteManagerContext = createContext({fm: new FavoritesManager([]), saveFavorites: () => {}, isLoading: true});

const FavoritesManagerProvider = (prop) => {
    const [fm, updateFM] = useState(new FavoritesManager([]));
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const init = async () => {
            setIsLoading(true);
            await fm.retrieve();
            updateFM(new FavoritesManager(fm.favorites));
            setIsLoading(false);
        }
        init();
    }, []);

    const saveFavorites = async () => {
        await fm.save();
        updateFM(new FavoritesManager(fm.favorites));
    }

    return (
    <FavoriteManagerContext.Provider value={{ fm, saveFavorites, isLoading }}>
        {prop.children}
    </FavoriteManagerContext.Provider>
    );
};

export { FavoriteManagerContext, FavoritesManagerProvider };