import { createContext, useState } from 'react';



const NavContext = createContext({curr: 0, updateCurr: (updateCurr: number)=>{}});

const NavProvider = (prop) => {
    const [curr, setCurr] = useState(0);

    const updateCurr = (updatedPage: number) => {
        setCurr(updatedPage);
    }

    return (
        <NavContext.Provider value={{ curr, updateCurr }}>
            {prop.children}
        </NavContext.Provider>
    );
};

export { NavContext, NavProvider };