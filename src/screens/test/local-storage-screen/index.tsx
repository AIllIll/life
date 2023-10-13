import React, { useEffect, useState } from 'react';
import { Button, TextInput, View, Text } from 'react-native';
import type { HomeDrawerParamList } from '../../../types';
import { DrawerScreenProps } from '@react-navigation/drawer';
import {
    AsyncStorageKeys,
    loadStorage,
    saveStorage,
} from '../../../storage/local';

const LocalStorageScreen = ({
    navigation,
    route,
}: DrawerScreenProps<HomeDrawerParamList, 'local-storage'>): JSX.Element => {
    const [input, setInput] = useState<string>('');
    const [text, setText] = useState<string>('');

    useEffect(() => {
        console.log(input);
    }, [input]);

    return (
        <View>
            <TextInput onChangeText={v => setInput(v)} />
            <Button
                title="save"
                onPress={async () =>
                    await saveStorage(AsyncStorageKeys.TEST, input)
                }
            />
            <Button
                title="load"
                onPress={async () =>
                    setText((await loadStorage(AsyncStorageKeys.TEST)) || '')
                }
            />
            <Text>{text}</Text>
        </View>
    );
};
export default LocalStorageScreen;
