import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


export default function SafeArea({ children }) {
    const insets = useSafeAreaInsets();

    return (
    <>
        <View
            style={{
                paddingTop: insets.top,
                paddingLeft: insets.left,
                paddingRight: insets.right,
            }}
        />
        <View style={[ {flex: 1}, themeStyles.bg ]}>
            {children}
        </View>
    </>
    );
}