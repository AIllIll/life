import React from 'react';
import type { PlanStackParamList, PlanTabProps } from '../types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PlanScreen from '../screens/plan-screen';

const PlanStack = createNativeStackNavigator<PlanStackParamList>();

function PlanTab({ navigation, route }: PlanTabProps): JSX.Element {
    return (
        <PlanStack.Navigator>
            <PlanStack.Screen name="plan" component={PlanScreen} />
        </PlanStack.Navigator>
    );
}
export default PlanTab;
