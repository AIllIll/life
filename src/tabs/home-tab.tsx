import React from 'react';
import type { HomeStackParamList, HomeTabProps } from '../types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/home-screen';
import Demo from '../screens/demo-screen';

const HomeStack = createNativeStackNavigator<HomeStackParamList>();

function HomeTab({ navigation, route }: HomeTabProps): JSX.Element {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name="home" component={HomeScreen} />
            <HomeStack.Screen name="demo" component={Demo} />
        </HomeStack.Navigator>
    );
}
export default HomeTab;
