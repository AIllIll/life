import moment, { Moment } from 'moment';
import { CalendarUtils } from 'react-native-calendars';

/**
 * you can't just extract the YYYY-MM-DD part from a date string, but should turn it to current time zone first
 * @param date
 * @returns
 */
export const getCalendarDateString = (date: number | Moment) => {
    const m = moment(date);
    return CalendarUtils.getCalendarDateString(+m.add(m.utcOffset(), 'minute'));
};

export const getTime = (timestamp: number): string => {
    return moment(timestamp).format(
        `${CalendarUtils.getCalendarDateString(timestamp)} HH:mm:ss`
    );
};
