import React from 'react';
import type { HomeStackParamList, HomeTabProps } from '../types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/home-screen';
import DemoScreen from '../screens/test/demo-screen';
import BackgroundTimerScreen from '../screens/test/background-timer-screen';

const HomeStack = createNativeStackNavigator<HomeStackParamList>();

const HomeTab = ({ navigation, route }: HomeTabProps): JSX.Element => {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name="home" component={HomeScreen} />
            <HomeStack.Screen name="demo" component={DemoScreen} />
            <HomeStack.Screen
                name="background-timer"
                component={BackgroundTimerScreen}
            />
        </HomeStack.Navigator>
    );
};
export default HomeTab;
