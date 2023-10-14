import React from 'react';
import type { PlanScreenProps } from '@src/types';
import MyAgenda from '@src/components/agenda';
import { View } from 'react-native';

const PlanScreen = ({ navigation, route }: PlanScreenProps): JSX.Element => {
    return (
        <View style={{ flex: 1 }}>
            <MyAgenda />
        </View>
    );
};
export default PlanScreen;
