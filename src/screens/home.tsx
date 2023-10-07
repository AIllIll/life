import React from 'react';
import { Button, Text, View } from 'react-native';
import { HomeScreenProps } from '../types';

function Home({ navigation, route }: HomeScreenProps): JSX.Element {
    return (
        <View>
            <Text>{route.params.username}的主页</Text>
            <Button title="Demo" onPress={() => navigation.navigate('Demo')} />
            <Button
                title="Home Again"
                onPress={() => navigation.push('Home', { username: 'niubi' })}
            />
            <Button title="Pop to top" onPress={() => navigation.popToTop()} />
        </View>
    );
}
export default Home;
