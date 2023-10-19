import moment from 'moment';
import { CalendarUtils } from 'react-native-calendars';

export const getTime = (timestamp: number): string => {
    return moment(timestamp).format(
        `${CalendarUtils.getCalendarDateString(timestamp)} HH:mm:ss`
    );
};
