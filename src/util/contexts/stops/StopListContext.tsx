import { createContext, useState, useEffect } from 'react';
import StopListManager from '@util/contexts/stops/manager';



const StopListManagerContext = createContext({slm: new StopListManager([]), isLoading: true});

const StopListManagerProvider = (prop) => {
    const [slm, updateSLM] = useState(new StopListManager([]));
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const init = async () => {
            setIsLoading(true);
            await slm.retrieve();
            updateSLM(new StopListManager(slm.list));
            setIsLoading(false);
        }
        init();
    }, []);

    return (
    <StopListManagerContext.Provider value={{ slm, isLoading }}>
        {prop.children}
    </StopListManagerContext.Provider>
    );
};

export { StopListManagerContext, StopListManagerProvider };