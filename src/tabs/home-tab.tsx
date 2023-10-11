import React from 'react';
import { HomeDrawerParamList, type HomeTabProps } from '../types';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/home-screen';
import DemoScreen from '../screens/test/demo-screen';
import BackgroundTimerScreen from '../screens/test/background-timer-screen';
import DrawerScreen from '../screens/test/drawer-screen';
import AlertScreen from '../screens/test/alert-screen';

const Drawer = createDrawerNavigator<HomeDrawerParamList>();

const HomeTab = ({ navigation, route }: HomeTabProps): JSX.Element => {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="home" component={HomeScreen} />
            <Drawer.Screen name="demo" component={DemoScreen} />
            <Drawer.Screen
                name="background-timer"
                component={BackgroundTimerScreen}
            />
            <Drawer.Screen name="drawer" component={DrawerScreen} />
            <Drawer.Screen name="alert" component={AlertScreen} />
        </Drawer.Navigator>
    );
};
export default HomeTab;
