import notifee, { TriggerType } from '@notifee/react-native';
import { notificationChannelIds } from '@src/notifications/channels';

const start = async (t: number) => {
    await notifee.createTriggerNotification(
        {
            title: 'start working out',
            android: {
                channelId: notificationChannelIds.workOutStart,
                timestamp: t,
                showTimestamp: true,
            },
        },
        {
            type: TriggerType.TIMESTAMP,
            timestamp: t,
        }
    );
};
const rest = async (t: number) => {
    await notifee.createTriggerNotification(
        {
            title: 'take a rest',
            android: {
                channelId: notificationChannelIds.workOutRest,
                timestamp: t,
                showTimestamp: true,
            },
        },
        {
            type: TriggerType.TIMESTAMP,
            timestamp: t,
        }
    );
};
const end = async (t: number) => {
    await notifee.createTriggerNotification(
        {
            title: 'finish working out',
            android: {
                channelId: notificationChannelIds.workOutFinish,
                timestamp: t,
                showTimestamp: true,
            },
        },
        {
            type: TriggerType.TIMESTAMP,
            timestamp: t,
        }
    );
};

export const initiateWorkOutProtocols = async (triggerTime: number) => {
    console.log('triggerTime', triggerTime);
    const oneMinute = 60 * 1000;
    await start(triggerTime);
    triggerTime += oneMinute;
    await rest(triggerTime);
    triggerTime += oneMinute;
    await start(triggerTime);
    triggerTime += oneMinute;
    await rest(triggerTime);
    triggerTime += oneMinute;
    await start(triggerTime);
    triggerTime += oneMinute;
    await end(triggerTime);
};
