const navScreens = [
    '/nav/all-stops',
    '/nav/nearby',
    '/nav/favorites',
    '/nav/trip-planner',
    '/nav/map'
];

const calcBackLink = (i) => {
    return navScreens[i];
}



export { calcBackLink }