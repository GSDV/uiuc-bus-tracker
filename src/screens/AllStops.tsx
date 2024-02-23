import { useEffect, useState, useContext } from 'react';
import { TextInput } from 'react-native';

import { StopListManagerContext } from '@util/contexts/stops/StopListContext';

import colorSelection from '@styles/Colors';

import StopsList from '@components/stops/StopsList';




export default function AllStops() {
    const slmContext = useContext(StopListManagerContext);
    const [stopsList, setStopsList] = useState(slmContext.slm.list);

    useEffect(() => {
        setStopsList(slmContext.slm.list);
    }, [slmContext.isLoading]);

    return (
        <>
            <SearchBar stopsList={slmContext.slm.list} setStopsList={setStopsList} />
            <StopsList list={stopsList} />
        </>
    );
}



function SearchBar({stopsList, setStopsList}) {
    const [searchText, setSearchText] = useState('');

    const onSearch = (term) => {
        const filteredStops = stopsList.filter((stop) => {
            return stop.stop_name.toLowerCase().includes(term.toLowerCase());
        });
        setStopsList(filteredStops);
    }

    return (
        <TextInput 
            style={{padding: 10, fontSize: 20, backgroundColor: colorSelection.whiteSoft, borderWidth: 10, borderColor: colorSelection.bluePrimary}}
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