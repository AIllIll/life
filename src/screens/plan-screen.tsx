import React from 'react';
import type { PlanScreenProps } from '../types';
import AgendaScreen from '../components/agenda';
import { View } from 'react-native';

const PlanScreen = ({ navigation, route }: PlanScreenProps): JSX.Element => {
    return (
        <View style={{ flex: 1 }}>
            <AgendaScreen />
        </View>
    );
};
export default PlanScreen;
