import React from 'react';
import { HomeDrawerParamList, type HomeTabProps } from '@src/types';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '@src/screens/home-screen';
import DemoScreen from '@src/screens/test/demo-screen';
import BackgroundTimerScreen from '@src/screens/test/background-timer-screen';
import DrawerScreen from '@src/screens/test/drawer-screen';
import AlertScreen from '@src/screens/test/alert-screen';
import NotificationScreen from '@src/screens/test/notification-screen';
import LocalStorageScreen from '@src/screens/test/local-storage-screen';

const Drawer = createDrawerNavigator<HomeDrawerParamList>();

const HomeTab = ({ navigation, route }: HomeTabProps): JSX.Element => {
    return (
        <Drawer.Navigator initialRouteName="local-storage">
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
