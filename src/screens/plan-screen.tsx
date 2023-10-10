import React, { useState } from 'react';
import type { PlanScreenProps } from '../types';
import AgendaScreen from '../components/agenda';
import BackgroundTimer from 'react-native-background-timer';
import moment from 'moment';
import { View, Button } from 'react-native';
import FlashMessage from 'react-native-flash-message';

function PlanScreen({ navigation, route }: PlanScreenProps): JSX.Element {
    const [timer1, setTimer1] = useState(0);
    const [timer2, setTimer2] = useState(0);
    return (
        <View style={{ flex: 1 }}>
            <AgendaScreen />
        </View>
    );
}
export default PlanScreen;
