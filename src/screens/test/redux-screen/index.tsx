import React, { useEffect, useState } from 'react';
import { HomeDrawerParamList } from '@src/types';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { Button, TextInput, View } from 'react-native';
import { setTestValue } from '@src/store';
import { useAppDispatch } from '@src/hooks';
import DeepComponent from './deep-component';

const ReduxScreen = ({
    navigation,
    route,
}: DrawerScreenProps<HomeDrawerParamList, 'redux'>): JSX.Element => {
    const [input, setInput] = useState<string>('');
    const dispatch = useAppDispatch();

    useEffect(() => {
        console.log(input);
    }, [input]);

    return (
        <View>
            <TextInput onChangeText={v => setInput(v)} />
            <Button
                title="save"
                onPress={() => dispatch(setTestValue(input))}
            />
            <DeepComponent />
        </View>
    );
};
export default ReduxScreen;
