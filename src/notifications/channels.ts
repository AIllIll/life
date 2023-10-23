import NotificationSounds from 'react-native-notification-sounds';

import notifee, {
    AndroidChannel,
    AndroidColor,
    AndroidImportance,
    AndroidVisibility,
} from '@notifee/react-native';

export enum notificationChannelIds {
    workOutStart = 'workOutStart',
    workOutRest = 'workOutRest',
    workOutFinish = 'workOutFinish',
}

const defaultChannelConfig = {
    bypassDnd: false,
    lights: true,
    vibration: true,
    importance: AndroidImportance.HIGH,
    lightColor: AndroidColor.RED,
    visibility: AndroidVisibility.PUBLIC,
    vibrationPattern: [3, 1],
    // groupId: "",
};

const createChannel = async (id: string, soundUri: string) => {
    await notifee.createChannel({
        ...defaultChannelConfig,
        id,
        name: id,
        description: `my channel description (channelId: ${id})`,
        sound: soundUri,
    });
};

export const prepareNotificationChannels = async (): Promise<void> => {
    await notifee.requestPermission();
    const soundList = await NotificationSounds.getNotifications('notification');
    // https://notifee.app/react-native/reference/androidchannel#properties
    // work out
    await createChannel(notificationChannelIds.workOutStart, soundList[0].url);
    await createChannel(notificationChannelIds.workOutRest, soundList[1].url);
    await createChannel(notificationChannelIds.workOutFinish, soundList[2].url);
};
