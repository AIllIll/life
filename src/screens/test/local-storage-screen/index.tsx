import React, { useEffect, useState } from 'react';
import { Button, TextInput, View, Text } from 'react-native';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { AsyncStorageKeys, loadStorage, saveStorage } from '@src/storage/local';
import { HomeDrawerParamList } from '@src/types';

const LocalStorageScreen = ({
    navigation,
    route,
}: DrawerScreenProps<HomeDrawerParamList, 'local-storage'>): JSX.Element => {
    const [input, setInput] = useState<string>('');
    const [text, setText] = useState<string>('');

    useEffect(() => {
        console.log(input);
    }, [input]);

    // load storage when mounted
    useEffect(() => {
        loadStorage(AsyncStorageKeys.TEST, result => {
            console.log(result);
            setText(result || '');
        });
    }, []);

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
