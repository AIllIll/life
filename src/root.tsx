import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeTab from './tabs/home-tab';
import ProfileTab from './tabs/profile-tab';
import type { TabsParamList } from './types';

const Tab = createBottomTabNavigator<TabsParamList>();

function Root(): JSX.Element {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route, navigation }) => ({
                    headerStyle: { backgroundColor: 'papayawhip' },
                    // tabBarTitle: 1223,
                })}>
                <Tab.Screen
                    name="home-tab"
                    component={HomeTab}
                    options={{
                        title: 'Home',
                        headerShown: false,
                        tabBarBadge: 3,
                    }}
                />
                <Tab.Screen
                    name="profile-tab"
                    component={ProfileTab}
                    options={{ title: 'Profile', headerShown: false }}
                    initialParams={{ username: 'wyc' }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default Root;
