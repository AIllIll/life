import React from 'react';
import { useAppSelector } from '@src/hooks';
import { RootState } from '@src/store';
import { Text } from 'react-native';

const DeepComponent = (): JSX.Element => {
    const text = useAppSelector((state: RootState) => state['tests']);
    return <Text>{text}</Text>;
};

export default DeepComponent;
