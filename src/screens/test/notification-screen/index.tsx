import React from 'react';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { HomeDrawerParamList } from '../../../types';
import { Button, View } from 'react-native';
import notifee, {
    AndroidChannel,
    AndroidColor,
    AndroidImportance,
    AndroidVisibility,
    TimestampTrigger,
    TriggerType,
} from '@notifee/react-native';
import BackgroundTimer from 'react-native-background-timer';
import NotificationSounds from 'react-native-notification-sounds';
import useAutoIncreasement from '../../../utils/auto-increasement';

const CHANNEL_ID = 'life-app';

const NotificationScreen = ({
    navigation,
    route,
}: DrawerScreenProps<HomeDrawerParamList, 'notification'>): JSX.Element => {
    const autoIncreasement = useAutoIncreasement(0);
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
    const onPressShowNotification = async (): Promise<string> => {
        return await notifee.displayNotification({
            title: 'Notification Title',
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
        });
    };
    const onCreateTriggerNotification = async (): Promise<void> => {
        const date = new Date(Date.now());
        date.setSeconds(date.getSeconds() + 2);

        // Create a time-based trigger
        const trigger: TimestampTrigger = {
            type: TriggerType.TIMESTAMP,
            timestamp: date.getTime(), // fire at 11:10am (10 minutes before meeting)
        };

        // Create a trigger notification
        await notifee.createTriggerNotification(
            {
                title: 'Meeting with Jane',
                body: 'Today at 11:20am',
                android: {
                    channelId: CHANNEL_ID,
                    sound: 'local.wav',
                },
            },
            trigger
        );
    };

    return (
        <View>
            <Button onPress={prepare} title="prepare" />
            <Button
                onPress={onPressShowNotification}
                title="show notification"
            />
            <Button
                onPress={() =>
                    BackgroundTimer.setTimeout(
                        () => onPressShowNotification(),
                        3000
                    )
                }
                title="show notification after 3 seconds"
            />
            <Button
                onPress={onCreateTriggerNotification}
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
                onPress={() => notifee.cancelAllNotifications()}
            />
            <Button
                title="openNotificationSettings"
                onPress={() => notifee.openNotificationSettings()}
            />
        </View>
    );
};
export default NotificationScreen;
