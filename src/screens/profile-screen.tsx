import React from 'react';
import { Button, Text, View } from 'react-native';
import type { ProfileScreenProps } from '../types';

function ProfileScreen({ navigation, route }: ProfileScreenProps): JSX.Element {
    return (
        <View>
            <Text>{route.params.username}的主页</Text>
            {/* <Button title="Demo" onPress={() => navigation.navigate('demo')} /> */}
            <Button
                title="Profile Again"
                onPress={() =>
                    navigation.push('profile', {
                        username: route.params.username + '1',
                    })
                }
            />
            <Button title="Pop to top" onPress={() => navigation.popToTop()} />
        </View>
    );
}
export default ProfileScreen;
