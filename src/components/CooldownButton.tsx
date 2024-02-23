import React, { useState, useRef, useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Svg, Circle, G } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';

import colorSelection from '@styles/Colors';
import headerButton_styles from '@styles/HeaderButton';



interface CooldownButtonType {
    icon: string,
    cooldown: number,
    onPress: ()=>void
}

const CooldownButton = ({icon, cooldown, onPress}: CooldownButtonType) => {
    const [timer, setTimer] = useState(cooldown);
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const timerRef = useRef(null);

    const pressedButton = async () => {
        if (buttonDisabled) return;
        setButtonDisabled(true);
        setTimer(cooldown);
        onPress();
    }

    const updateTimer = (prevTimer) => {
        if (prevTimer > 0) return prevTimer - 0.01;
        clearInterval(timerRef.current);
        setButtonDisabled(false);
        return cooldown;
    }

    useEffect(() => {
        if (!buttonDisabled) return;
        timerRef.current = setInterval(() => {setTimer(updateTimer);}, 10);
        return () => clearInterval(timerRef.current);
    }, [buttonDisabled]);

    return (
        <View>
            <Svg height='50' width='50' style={{position: 'absolute'}}>
                <G transform={`rotate(-90 25 25)`}>
                    <Circle cx='25' cy='25' r='20' fill='transparent' stroke={colorSelection.bluePrimary} strokeWidth='10' strokeDasharray={`${(timer / cooldown) * 125}, 125`} />
                </G>
            </Svg>

            <TouchableOpacity onPress={pressedButton} disabled={buttonDisabled} style={[headerButton_styles.button, {opacity: (buttonDisabled ? 0.5 : 1)}]} >
                <Ionicons opacity={(buttonDisabled ? 0.5 : 1)} name={icon as any} size={30} color={colorSelection.whiteSoft} />
            </TouchableOpacity>
        </View>
  );
};



export default CooldownButton;