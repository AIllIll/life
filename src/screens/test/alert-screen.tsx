import React, { useCallback, useState } from 'react';
import { HomeDrawerParamList } from '@src/types';
import { Button, View } from 'react-native';
import { DrawerScreenProps } from '@react-navigation/drawer';
import {
    showMessage,
    hideMessage,
    MessageType,
} from 'react-native-flash-message';
import BackgroundTimer from 'react-native-background-timer';
import moment from 'moment';

// 其实只有5种，none和default是一样的
const msgTypeList: MessageType[] = [
    'none',
    'default',
    'info',
    'success',
    'danger',
    'warning',
];

const AlertScreen = ({
    navigation,
    route,
}: DrawerScreenProps<HomeDrawerParamList, 'alert'>): JSX.Element => {
    const [intervalId, setIntervalId] = useState<number>(0);
    const [msgTypeIdx, setMsgTypeIdx] = useState<number>(0);
    const showMsg = useCallback(
        (msgTypeIdxArg: number) => {
            showMessage({
                message: `Simple message: ${msgTypeList[msgTypeIdxArg]}`,
                description: 'This is our second message',
                type: msgTypeList[msgTypeIdxArg],
                hideOnPress: false,
                onPress: () => {
                    console.log(msgTypeIdxArg);
                    setMsgTypeIdx((msgTypeIdxArg + 1) % msgTypeList.length);
                    showMsg((msgTypeIdxArg + 1) % msgTypeList.length);
                },
            });
        },
        [msgTypeIdx]
    );
    return (
        <View>
            <Button
                onPress={() => showMsg(msgTypeIdx)}
                title="show alert"
                color="#841584"
            />
            <Button
                onPress={() => {
                    /* HERE IS WHERE WE'RE GOING TO SHOW OUR FIRST MESSAGE */
                    hideMessage();
                }}
                title="hide alert"
                color="#841584"
            />
            <Button
                onPress={() => {
                    BackgroundTimer.clearInterval(intervalId);
                    setIntervalId(
                        BackgroundTimer.setInterval(() => {
                            showMessage({
                                message: `timer`,
                                description: `${moment().format(
                                    'YYYY-MM-DD HH:mm:ss'
                                )}`,
                                type: 'info',
                                hideOnPress: false,
                            });
                        }, 1000)
                    );
                }}
                title="start timer"
                color="#841584"
            />
        </View>
    );
};
export default AlertScreen;
