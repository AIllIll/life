import React from 'react';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { HomeDrawerParamList } from '../../types';
import { Button, View } from 'react-native';
import notifee, {
    AndroidImportance,
    AndroidVisibility,
    AuthorizationStatus,
    TimestampTrigger,
    TriggerType,
} from '@notifee/react-native';
import BackgroundTimer from 'react-native-background-timer';

const myChannelId = 'important';

const NotificationScreen = ({
    navigation,
    route,
}: DrawerScreenProps<HomeDrawerParamList, 'notification'>): JSX.Element => {
    async function onDisplayNotification() {
        // Request permissions (required for iOS)
        const res = await notifee.requestPermission();
        console.log(res);
        // Create a channel (required for Android)
        const channelId = await notifee.createChannel({
            id: myChannelId,
            name: 'Important Notifications',
            importance: AndroidImportance.HIGH,
            lights: true,
            vibration: true,
            visibility: AndroidVisibility.PUBLIC,
        });
        console.log(channelId);

        // Display a notification
        try {
            const res2 = await notifee.displayNotification({
                title: 'Notification Title',
                body: 'Main body content of the notification',
                android: {
                    channelId,
                    smallIcon: 'ic_launcher', // optional, defaults to 'ic_launcher'.
                    // pressAction is needed if you want the notification to open the app when pressed
                    pressAction: {
                        id: 'default',
                    },
                },
            });
            console.log(res2);
            console.log(666);
        } catch (e) {
            console.log(e);
        }
    }
    async function checkNotificationPermission() {
        const settings = await notifee.getNotificationSettings();

        if (settings.authorizationStatus == AuthorizationStatus.AUTHORIZED) {
            console.log('Notification permissions has been authorized');
        } else if (settings.authorizationStatus == AuthorizationStatus.DENIED) {
            console.log('Notification permissions has been denied');
        }
    }
    async function onCreateTriggerNotification() {
        await checkNotificationPermission();
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
                    channelId: myChannelId,
                    sound: 'local.wav',
                },
            },
            trigger
        );
    }
    return (
        <View>
            <Button
                onPress={async () => await onDisplayNotification()}
                title="show notification"
            />
            <Button
                onPress={() =>
                    BackgroundTimer.setTimeout(
                        () => onDisplayNotification(),
                        3000
                    )
                }
                title="show notification after hiding screen"
            />
            <Button
                onPress={() => onCreateTriggerNotification()}
                title="trigger notification"
            />
        </View>
    );
};
export default NotificationScreen;
