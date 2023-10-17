import React, { useEffect, useState } from 'react';
import { Button, FlatList, Text, TextInput, View } from 'react-native';

import { DrawerScreenProps } from '@react-navigation/drawer';
import { useAppDispatch, useAppSelector } from '@src/hooks';
import { RootState } from '@src/store';
import {
    fetchTodos,
    saveTodos,
    selectTodos,
    todoAdded,
} from '@src/store/slices/todos';

import DeepComponent from './deep-component';

import type { HomeDrawerParamList } from '@src/types';

const ReduxScreen = ({
    navigation,
    route,
}: DrawerScreenProps<HomeDrawerParamList, 'redux'>): JSX.Element => {
    const [input, setInput] = useState<string>('');
    const dispatch = useAppDispatch();

    useEffect(() => {
        console.log('input', input);
    }, [input]);

    const status = useAppSelector((state: RootState) => state['todos'].status);
    const todos = useAppSelector(state => {
        return selectTodos(state);
    });

    useEffect(() => {
        console.log('todos', todos);
    }, [todos]);

    return (
        <View>
            <Text>{status}</Text>
            <FlatList
                data={todos}
                renderItem={({ item }) => <Text>{item.title}</Text>}
                keyExtractor={({ id }) => id}
            />
            <TextInput onChangeText={v => setInput(v)} />
            <Button title="add" onPress={() => dispatch(todoAdded(input))} />
            <Button
                title="fetch todos"
                onPress={() => dispatch(fetchTodos())}
            />
            <Button
                title="save todos"
                onPress={() => dispatch(saveTodos(todos))}
            />
            <DeepComponent />
        </View>
    );
};
export default ReduxScreen;
