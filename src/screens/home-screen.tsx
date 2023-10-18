import React from 'react';
import { Button, View } from 'react-native';

import { DrawerScreenProps } from '@react-navigation/drawer';

import type { HomeDrawerParamList } from '@src/types';
const HomeScreen = ({
    navigation,
    route,
}: DrawerScreenProps<HomeDrawerParamList, 'home'>): JSX.Element => {
    return (
        <View>
            {/* <Text>{route.params.username}的主页</Text> */}
            <Button title="Demo" onPress={() => navigation.navigate('demo')} />
            <Button
                title="Background Timer"
                onPress={() => navigation.navigate('background-timer')}
            />
            <Button
                title="Home Again"
                onPress={() => navigation.navigate('home')}
            />
            <Button
                title="open drawer"
                onPress={() => navigation.openDrawer()}
            />
        </View>
    );
};
export default HomeScreen;
