import React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '@src/screens/home-screen';
import AlertScreen from '@src/screens/test/alert-screen';
import BackgroundTimerScreen from '@src/screens/test/background-timer-screen';
import DemoScreen from '@src/screens/test/demo-screen';
import DrawerScreen from '@src/screens/test/drawer-screen';
import LocalStorageScreen from '@src/screens/test/local-storage-screen';
import NotificationScreen from '@src/screens/test/notification-screen';
import ReactNativeCalendarScreen from '@src/screens/test/react-native-calendar-screen';
import ReduxScreen from '@src/screens/test/redux-screen';
import { HomeDrawerParamList, HomeTabProps } from '@src/types';

const Drawer = createDrawerNavigator<HomeDrawerParamList>();

const HomeTab = ({ navigation, route }: HomeTabProps): JSX.Element => {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="redux" component={ReduxScreen} />
            <Drawer.Screen
                name="react-native-calendar"
                component={ReactNativeCalendarScreen}
            />
            <Drawer.Screen name="home" component={HomeScreen} />
            <Drawer.Screen name="demo" component={DemoScreen} />
            <Drawer.Screen
                name="background-timer"
                component={BackgroundTimerScreen}
            />
            <Drawer.Screen name="drawer" component={DrawerScreen} />
            <Drawer.Screen name="alert" component={AlertScreen} />
            <Drawer.Screen name="notification" component={NotificationScreen} />
            <Drawer.Screen
                name="local-storage"
                component={LocalStorageScreen}
            />
        </Drawer.Navigator>
    );
};
export default HomeTab;
