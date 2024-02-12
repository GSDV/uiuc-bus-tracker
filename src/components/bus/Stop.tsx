import { useContext, useEffect, useState } from 'react';
import { Text, Image, View, TouchableOpacity } from 'react-native';

import stop_Styles from '@styles/Stop';

import { FavoriteManagerContext } from '@util/favorites/FavoritesManagerContext';

import StarEmptySrc from '@assets/star/empty.png';
import StarFilledSrc from '@assets/star/filled.png';



interface StopType {
    id: string,
    name: string
}
export default function Stop({id, name}: StopType) {
    const favContext = useContext(FavoriteManagerContext);

    const [isFaved, setIsFaved] = useState(favContext.fm.isFavorited(id));
    const starIcon = isFaved ? StarFilledSrc : StarEmptySrc;

    const toggleFavorite = () => {
        if (isFaved) favContext.fm.removeFavorite(id);
        else favContext.fm.addFavorite(id, name);
        setIsFaved(!isFaved);
    }

    return (
        <View style={stop_Styles.container}>
            <Text style={stop_Styles.text} numberOfLines={1}>{name}</Text>
            <TouchableOpacity onPress={toggleFavorite}>
                <Image style={{width: 40, height: 40}} source={starIcon}/>
            </TouchableOpacity>
        </View>
    );
}