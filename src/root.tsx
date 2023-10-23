import moment from 'moment';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import { Provider } from 'react-redux';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HomeTab from '@src/tabs/home-tab';
import PlanTab from '@src/tabs/plan-tab';
import ProfileTab from '@src/tabs/profile-tab';

import { prepareNotificationChannels } from './notifications/channels';
import store from './store';

import type { TabsParamList } from './types';
const Tab = createBottomTabNavigator<TabsParamList>();

const Root = (): JSX.Element => {
    useEffect(() => {
        // todo trigger a initial thunk
        prepareNotificationChannels();
    }, []);
    return (
        <Provider store={store}>
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
        </Provider>
    );
};

export default Root;
