import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeTab from './tabs/home-tab';
import ProfileTab from './tabs/profile-tab';
import type { TabsParamList } from './types';
import PlanTab from './tabs/plan-tab';
import FlashMessage from 'react-native-flash-message';

const Tab = createBottomTabNavigator<TabsParamList>();

function Root(): JSX.Element {
    return (
        <View style={{ flex: 1 }}>
            <NavigationContainer>
                <Tab.Navigator
                    initialRouteName="plan-tab"
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
                        name="plan-tab"
                        component={PlanTab}
                        options={{
                            title: 'Plan',
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
            <FlashMessage position="top" />
            {/* <--- here as the last component */}
        </View>
    );
}

export default Root;
