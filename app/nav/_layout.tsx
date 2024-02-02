import { Slot } from 'expo-router';
import Nav from '@components/Nav';



// Navigation layout for the 5 main screens
export default function Layout() {
    return (
        <Nav>
            <Slot />
        </Nav>
    );
}