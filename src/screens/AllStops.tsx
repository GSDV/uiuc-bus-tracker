import { useEffect, useState, useContext } from 'react';
import { View, Text, ScrollView, TextInput, Pressable, FlatList } from 'react-native'
import { fetchAllStops } from '@util/bus-lib/stops';
import { useRouter } from 'expo-router';

import { StopListManagerContext } from '@util/stops/StopListContext';

import Stop from '@components/bus/Stop';

import Loading from '@components/Loading';



export default function AllStops() {
    const slmContext = useContext(StopListManagerContext);
    const [stopsList, setStopsList] = useState([]);

    const [displayedStops, setDisplayedStops] = useState([]);
    const [dsPage, setDSPage] = useState(1);

    const router = useRouter();

    useEffect(() => {
        setStopsList(slmContext.slm.list);
        setDSPage(1);
        setDisplayedStops(slmContext.slm.list.slice(0, 101));
    }, [slmContext.isLoading]);

    const setBothStopsLists = (list) => {
        setDSPage(1);
        setStopsList(list);
        setDisplayedStops(list);
    }

    const handleLoadMore = () => {
        if (100*(dsPage+1)+1 >= stopsList.length) setDisplayedStops(stopsList);
        else setDisplayedStops(stopsList.slice(0, (100*(dsPage+1)+1)));
        setDSPage(dsPage+1);
    }

    const renderItem = ({ item }) => {
        const stop = item;
        return (
            <Pressable onPress={() => {router.push(`/stop/?id=${stop.stop_id}&name=${stop.stop_name}`)}}>
                <Stop title={stop.stop_name} />
            </Pressable>
        )
    }

    const footerComponent = () => {
        return <>{(100*dsPage+1 < stopsList.length) ? <Text style={{textAlign: 'center', fontSize: 20}}>Loading...</Text> : null}</>;
    }

    return (
        <>
            <SearchBar stopsList={slmContext.slm.list} setStopsList={setBothStopsLists} />
            <FlatList 
                data={displayedStops} 
                keyExtractor={(stop) => stop.stop_id} 
                renderItem={renderItem}
                onEndReached={handleLoadMore} 
                onEndReachedThreshold={0.1} 
                ListFooterComponent={footerComponent} 
                contentContainerStyle={{display: 'flex', justifyContent: 'center', gap: 10, padding: 10}}  
            />
        </>
    );
}

function SearchBar({ stopsList, setStopsList }) {
    const [searchText, setSearchText] = useState('');

    const onSearch = (term) => {
        const filteredStops = stopsList.filter((stop) => {
            return stop.stop_name.includes(term);
        });
        setStopsList(filteredStops);
    }

    // useEffect(() => {
    //     console.log("AOSKMCOIQWM ", stopsList.length)
    //     setStopsList(stopsList);
    // }, [])

    return (
        <TextInput 
            style={{padding: 10, fontSize: 20, backgroundColor: 'rgba(1, 1, 1, 0.25)', borderWidth: 5, borderColor: 'rgba(0, 0, 0, 0.5)'}}
            placeholder='Search Stops...' 
            placeholderTextColor='rgba(0, 0, 0, 0.5)' 
            value={searchText} 
            onChangeText={(text) => {
                setSearchText(text);
                onSearch(text);
            }}
        />
    );
}