import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FlashMessage from 'react-native-flash-message';
import type { TabsParamList } from './types';
import HomeTab from '@src/tabs/home-tab';
import ProfileTab from '@src/tabs/profile-tab';
import PlanTab from '@src/tabs/plan-tab';

const Tab = createBottomTabNavigator<TabsParamList>();

const Root = (): JSX.Element => {
    return (
        <View style={{ flex: 1 }}>
            <NavigationContainer>
                <Tab.Navigator
                    initialRouteName="home-tab"
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
};

export default Root;
