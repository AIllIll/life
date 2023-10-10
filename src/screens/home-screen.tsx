import React from 'react';
import { Button, View } from 'react-native';
import type { HomeScreenProps } from '../types';

const HomeScreen = ({ navigation, route }: HomeScreenProps): JSX.Element => {
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
                onPress={() => navigation.push('home')}
            />
            <Button title="Pop to top" onPress={() => navigation.popToTop()} />
        </View>
    );
};
export default HomeScreen;
