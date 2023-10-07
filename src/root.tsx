import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/home';
import Demo from './screens/demo';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

function Root(): JSX.Element {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen
                    name="Home"
                    component={Home}
                    initialParams={{ username: 'wyc' }}
                />
                <Stack.Screen name="Demo" component={Demo} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Root;
