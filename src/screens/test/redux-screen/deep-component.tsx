import React from 'react';
import { Text } from 'react-native';

import { useAppSelector } from '@src/hooks';
import { RootState } from '@src/store';

const DeepComponent = (): JSX.Element => {
    const text = useAppSelector((state: RootState) => state.todos.status);
    return <Text>{text}</Text>;
};

export default DeepComponent;
