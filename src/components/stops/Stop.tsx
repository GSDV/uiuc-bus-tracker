import { useContext, useState } from 'react';
import { Text, Image, View, TouchableOpacity } from 'react-native';

import { FavoriteManagerContext } from '@util/contexts/favorites/FavoritesManagerContext';

import stop_Styles from '@styles/Stop';

import StarEmptySrc from '@assets/star/empty.png';
import StarFilledSrc from '@assets/star/filled.png';



interface StopType {
    id: string,
    name: string,
    loc: {
        lat: number;
        lon: number;
    }
}
export default function Stop({id, name, loc}: StopType) {
    const favContext = useContext(FavoriteManagerContext);

    const [isFaved, setIsFaved] = useState(favContext.fm.isFavorited(id));
    const starIcon = isFaved ? StarFilledSrc : StarEmptySrc;

    const toggleFavorite = () => {
        const stopParam = {
            stop_id: id,
            stop_name: name,
            loc: loc
        }
        if (isFaved) favContext.fm.removeFavorite(id);
        else favContext.fm.addFavorite(stopParam);
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