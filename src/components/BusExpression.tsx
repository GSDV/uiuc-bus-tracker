import { View, Image, Text } from 'react-native'

import DeadSrc from '@assets/bus-expressions/dead.png'
import SadSrc from '@assets/bus-expressions/sad.png'
import ConfusedSrc from '@assets/bus-expressions/confused.png'
import LoadingSrc from '@assets/bus-expressions/loading.png'



interface BusExpressionType {
    msg: string,
    img: 'dead' | 'sad' | 'confused' | 'loading'
}

function BusExpression({img, msg}: BusExpressionType) {
    let imgSrc = null;
    if (img=='dead') imgSrc = DeadSrc;
    if (img=='sad') imgSrc = SadSrc;
    if (img=='confused') imgSrc = ConfusedSrc;
    else if (img=='loading') imgSrc = LoadingSrc;

    return (
        <View style={{flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20}}>
            <Image style={{width: 300, height: 300}} source={imgSrc} />
            <Text style={{fontSize: 25, textAlign: 'center'}}>{msg}</Text>
        </View>
    );
}



export { BusExpression, BusExpressionType }