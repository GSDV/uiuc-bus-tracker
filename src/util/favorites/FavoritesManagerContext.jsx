import React, { createContext, useState, useEffect } from 'react';
import FavoritesManager from '@util/favorites/manager';


const FavoriteManagerContext = createContext({pm: new FavoritesManager([]), saveFavorites: () => {}});

const FavoritesManagerProvider = (prop) => {
    const [fm, updateFM] = useState(new FavoritesManager([]));


    useEffect(() => {
        const getAsync = async () => {
            await fm.retrieve();
            updateFM(new FavoritesManager(fm.favorites));
        }
        getAsync();
    }, []);

    const saveFavorites = async () => {
        await fm.save();
        updateFM(new FavoritesManager(fm.favorites));
    }

    return (
    <FavoriteManagerContext.Provider value={{ fm, saveFavorites }}>
        {prop.children}
    </FavoriteManagerContext.Provider>
    );
};

export { FavoriteManagerContext, FavoritesManagerProvider };