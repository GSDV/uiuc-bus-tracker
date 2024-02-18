import { SafeAreaView } from 'react-native-safe-area-context';
import colorSelection from '@styles/Colors';



export default function TopSafeArea() {
    return <SafeAreaView edges={['top', 'left', 'right']} style={{backgroundColor: colorSelection.bluePrimary}} />;
}