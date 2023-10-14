import React from 'react';
import { HomeDrawerParamList } from '@src/types';
import { DrawerLayoutAndroid, Text } from 'react-native';
import { DrawerScreenProps } from '@react-navigation/drawer';

const DrawerScreen = ({
    navigation,
    route,
}: DrawerScreenProps<HomeDrawerParamList, 'drawer'>): JSX.Element => {
    return (
        <DrawerLayoutAndroid
            drawerWidth={300}
            drawerPosition="left"
            renderNavigationView={() => {
                return <Text>drwaer</Text>;
            }}>
            <Text>content</Text>
        </DrawerLayoutAndroid>
    );
};
export default DrawerScreen;
