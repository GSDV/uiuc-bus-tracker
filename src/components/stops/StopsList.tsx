import { useEffect, useState } from 'react';
import { Text, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

import Stop from '@components/stops/Stop';



// list: the original list of stops, never edited. This list parameter is not necessarily the full MTD stop list: it might be filtered, favorited, or nearby stops.
// displayedStops: a subset of list (from 0 to dsPage*100), which are shown in FlatList.
export default function StopsList({list}) {
    const [displayedStops, setDisplayedStops] = useState(list);
    const [dsPage, setDSPage] = useState(1);

    const handleLoadMore = () => {
        if (100*(dsPage+1)+1 >= list.length) setDisplayedStops(list);
        else setDisplayedStops(list.slice(0, (100*(dsPage+1)+1)));
        setDSPage(dsPage+1);
    }

    const footerComponent = () => {
        return <>{(100*dsPage+1 < list.length) ? <Text style={{textAlign: 'center', fontSize: 20}}>Loading...</Text> : null}</>;
    }

    useEffect(() => {
        setDisplayedStops(list);
        setDSPage(1);
    }, [list.length]);

    return (
        <FlatList 
                data={displayedStops} 
                keyExtractor={(stop) => stop.stop_id} 
                renderItem={(item) => <FlatListRenderItem stop={item.item} />}
                onEndReached={handleLoadMore} 
                onEndReachedThreshold={0.1} 
                ListFooterComponent={footerComponent} 
                contentContainerStyle={{display: 'flex', justifyContent: 'center', gap: 10, padding: 10}}  
            />
    );
}



function FlatListRenderItem({stop}) {
    const router = useRouter();

    let loc = {lat: 0, lon: 0};
    if (stop.loc==null) {
        stop.stop_points.map((p) => {
            loc.lat = loc.lat + p.stop_lat;
            loc.lon = loc.lon + p.stop_lon;
        });
        loc.lat = loc.lat / stop.stop_points.length;
        loc.lon = loc.lon / stop.stop_points.length;
    } else {
        loc = stop.loc;
    }

    return (
        <TouchableOpacity onPress={() => {router.push(`/stop/?id=${stop.stop_id}&name=${stop.stop_name}&locParam=${JSON.stringify(loc)}`)}}>
            <Stop name={stop.stop_name} id={stop.stop_id} loc={loc} />
        </TouchableOpacity>
    );
}