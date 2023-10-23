import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
import {
    Alert,
    Button,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import BackgroundTimer from 'react-native-background-timer';
import NotificationSounds from 'react-native-notification-sounds';

import notifee, {
    AndroidChannel,
    AndroidColor,
    AndroidImportance,
    AndroidVisibility,
    TimestampTrigger,
    TriggerType,
} from '@notifee/react-native';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { HomeDrawerParamList } from '@src/types';
import useAutoIncreasement from '@src/utils/auto-increasement';

const CHANNEL_ID = 'life-app';

const NotificationScreen = ({
    navigation,
    route,
}: DrawerScreenProps<HomeDrawerParamList, 'notification'>): JSX.Element => {
    const autoIncreasement = useAutoIncreasement(0);

    const [delayInputModalVisible, setDelayInputModalVisible] =
        useState<boolean>(false);
    const [triggerDelay, setTriggerDelay] = useState<number>(10);

    const [notificationList, setNotificationList] = useState<any[]>([]);
    const refreshNotifications = useCallback(async () => {
        const res = await notifee.getTriggerNotifications();
        console.log(res);
        setNotificationList(res);
    }, []);
    useEffect(() => {
        refreshNotifications();
    }, [refreshNotifications]);

    const prepare = async (): Promise<string> => {
        const res = await notifee.requestPermission();
        console.log(res);
        const soundList = await NotificationSounds.getNotifications(
            'notification'
        );
        const soundListIdx = autoIncreasement();
        console.log(soundListIdx, soundList[soundListIdx].url);
        // https://notifee.app/react-native/reference/androidchannel#properties
        const channel: AndroidChannel = {
            id: CHANNEL_ID,
            name: CHANNEL_ID,
            bypassDnd: false,
            description: `my channel description (channelId: ${CHANNEL_ID})`,
            lights: true,
            vibration: true,
            // groupId: "",
            importance: AndroidImportance.HIGH,
            lightColor: AndroidColor.RED,
            visibility: AndroidVisibility.PUBLIC,
            vibrationPattern: [3, 1],
            sound: soundList[soundListIdx].url,
            soundURI: soundList[soundListIdx].url,
        };
        return await notifee.createChannel(channel);
    };

    const onCreateTriggerNotification = async (
        delay: number
    ): Promise<void> => {
        const date = new Date(Date.now());
        date.setSeconds(date.getSeconds() + delay);

        // Create a time-based trigger
        const trigger: TimestampTrigger = {
            type: TriggerType.TIMESTAMP,
            timestamp: date.getTime(), // fire at 11:10am (10 minutes before meeting)
        };

        // Create a trigger notification
        await notifee.createTriggerNotification(
            {
                title: 'trigger by time',
                body: moment(date).format('YYYY-MM-DD HH:mm:ss'),
                android: {
                    channelId: CHANNEL_ID,
                    sound: 'local.wav',
                },
            },
            trigger
        );
        // const triggerId = await notifee.createTriggerNotification(
        //     {
        //         title: 'trigger by time (should be canceled)',
        //         body: moment(date).format('YYYY-MM-DD HH:mm:ss'),
        //         android: {
        //             channelId: CHANNEL_ID,
        //             sound: 'local.wav',
        //         },
        //     },
        //     trigger
        // );
        // await notifee.cancelTriggerNotification(triggerId);
    };

    return (
        <View>
            <Button onPress={prepare} title="prepare" />
            <Button
                onPress={async () =>
                    await notifee.displayNotification({
                        title: 'Notification Title',
                        subtitle: 'Notification Subtitle',
                        body: 'Main body content of the notification',
                        android: {
                            channelId: CHANNEL_ID,
                            smallIcon: 'ic_launcher', // optional, defaults to 'ic_launcher'.
                            // pressAction is needed if you want the notification to open the app when pressed
                            pressAction: {
                                id: 'default',
                            },
                            importance: AndroidImportance.HIGH,
                        },
                    })
                }
                title="show notification"
            />
            <Button
                onPress={async () =>
                    await notifee.displayNotification({
                        title: 'Notification Title',
                        subtitle: 'Notification Subtitle',
                        body: 'Main body content of the notification',
                        android: {
                            channelId: CHANNEL_ID,
                            smallIcon: 'ic_launcher', // optional, defaults to 'ic_launcher'.
                            // pressAction is needed if you want the notification to open the app when pressed
                            pressAction: {
                                id: 'default',
                            },
                            importance: AndroidImportance.HIGH,
                            // 通知上可以挂上时间
                            timestamp: Date.now() - 480000, // 8 minutes ago
                            showTimestamp: true, // 显示时间
                        },
                    })
                }
                title="show notification with time"
            />
            <Button
                onPress={async () =>
                    await notifee.displayNotification({
                        title: 'Notification Title',
                        subtitle: 'Notification Subtitle',
                        body: 'Main body content of the notification',
                        android: {
                            channelId: CHANNEL_ID,
                            smallIcon: 'ic_launcher', // optional, defaults to 'ic_launcher'.
                            // pressAction is needed if you want the notification to open the app when pressed
                            pressAction: {
                                id: 'default',
                            },
                            importance: AndroidImportance.HIGH,
                            // 通知上可以挂上倒计时
                            timestamp: Date.now() + 480000, // 8 minutes later
                            showChronometer: true, // 显示倒计时
                            chronometerDirection: 'down',
                        },
                    })
                }
                title="show notification with countdown"
            />
            <Button
                onPress={() =>
                    BackgroundTimer.setTimeout(
                        async () =>
                            await notifee.displayNotification({
                                title: 'Notification Title',
                                subtitle: 'Notification Subtitle',
                                body: 'Main body content of the notification',
                                android: {
                                    channelId: CHANNEL_ID,
                                    smallIcon: 'ic_launcher', // optional, defaults to 'ic_launcher'.
                                    // pressAction is needed if you want the notification to open the app when pressed
                                    pressAction: {
                                        id: 'default',
                                    },
                                    importance: AndroidImportance.HIGH,
                                },
                            }),
                        10000
                    )
                }
                title="show notification after 10 seconds"
            />
            <Button
                onPress={() => setDelayInputModalVisible(true)}
                title="trigger notification by time"
            />
            <Button
                onPress={async () => {
                    const channelList = await notifee.getChannels();
                    for (const channel of channelList) {
                        console.log(channel);
                        await notifee.deleteChannel(channel.id);
                    }
                }}
                title="delete all channels"
            />
            <Button
                title="cancel all notifications"
                color={'red'}
                onPress={() => {
                    notifee.cancelAllNotifications();
                    refreshNotifications();
                }}
            />
            <Button
                title="openNotificationSettings"
                onPress={() => notifee.openNotificationSettings()}
            />
            <Button
                title="refreshNotifications"
                onPress={() => refreshNotifications()}
            />
            <View>
                {notificationList.map((n, i) => (
                    <Text key={i}>
                        {moment(n['trigger']['timestamp']).format(
                            'YYYY-MM-DD HH:mm:ss'
                        )}
                        ,{n['notification']['title']}
                    </Text>
                ))}
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={delayInputModalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setDelayInputModalVisible(!delayInputModalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Hello World!</Text>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() =>
                                setDelayInputModalVisible(
                                    !delayInputModalVisible
                                )
                            }>
                            <Text style={styles.textStyle}>Hide Modal</Text>
                        </Pressable>
                        <TextInput
                            style={styles.input}
                            placeholder="trigger delay"
                            onChangeText={text => setTriggerDelay(Number(text))}
                            keyboardType="numeric"
                        />
                        <Button
                            title="comfirm"
                            onPress={() =>
                                onCreateTriggerNotification(triggerDelay)
                            }
                        />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '80%',
        display: 'flex',
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    input: {
        borderStyle: 'dashed',
        borderWidth: 1,
        width: '100%',
    },
});
export default NotificationScreen;
