import groupBy from 'lodash/groupBy';
import moment from 'moment';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { View } from 'react-native';
import {
    CalendarProvider,
    CalendarUtils,
    ExpandableCalendar,
    TimelineEventProps,
    TimelineList,
    TimelineProps,
} from 'react-native-calendars';

import { useAppDispatch, useAppSelector } from '@src/hooks';
import {
    fetchAll,
    selectAgendaDates,
    selectAgendas,
} from '@src/store/slices/agendas';

import { getCalendarDateString, getTime } from './helper';
import { useAgendaCreateModal } from './modals/create';

import type { PlanScreenProps } from '@src/types';
const INITIAL_TIME = { hour: 9, minutes: 0 };

const PlanScreen = ({ navigation, route }: PlanScreenProps): JSX.Element => {
    const [currentDate, setCurrentDate] = useState(
        getCalendarDateString(+moment())
    );

    const busyDates = useAppSelector(selectAgendaDates);
    const marked = useMemo(() => {
        return busyDates.reduce(
            (m: { [key: string]: { marked: boolean } }, cur: string) => {
                m[getCalendarDateString(+moment(cur))] = {
                    marked: true,
                };
                return m;
            },
            {
                [getCalendarDateString(+moment())]: {
                    marked: true,
                },
            }
        );
    }, [busyDates]);
    const dispatch = useAppDispatch();
    const agendas = useAppSelector(selectAgendas);
    const eventsByDate = useMemo(() => {
        const timelineEvents: TimelineEventProps[] = agendas.map(a => ({
            start: getTime(a.startTimestamp),
            end: getTime(a.endTimestamp),
            title: a.title,
            summary: a.summary,
            color: '#e6add8',
        }));
        return groupBy(timelineEvents, e =>
            CalendarUtils.getCalendarDateString(e.start)
        );
    }, [agendas]);

    useEffect(() => {
        dispatch(fetchAll());
    }, []);
    useEffect(() => {
        // const m = moment();
        // console.log('m', m);
        // console.log(CalendarUtils.getCalendarDateString(+m));
        // m.add(-1, 'h');
        // console.log('m', m);
        // console.log(
        //     CalendarUtils.getCalendarDateString(
        //         +m.add(moment().utcOffset(), 'minute')
        //     )
        // );
        console.log('marked', marked);
    }, [marked]);

    useEffect(() => {
        console.log('eventsByDate', eventsByDate);
    }, [eventsByDate]);

    const onDateChanged = (date: string, source: string) => {
        console.log('TimelineCalendarScreen onDateChanged: ', date, source);
        setCurrentDate(date);
    };

    const onMonthChange = () => (month: any, updateSource: any) => {
        console.log(
            'TimelineCalendarScreen onMonthChange: ',
            month,
            updateSource
        );
    };

    const onBackgroundLongPress: TimelineProps['onBackgroundLongPress'] =
        useCallback((timeString: string, timeObject: any) => {
            console.log('onBackgroundLongPress');
            console.log('timeString', timeString);
            console.log('timeObject', timeObject);
            setCreateModalVisible(true);
            // const hourString = `${(timeObject.hour + 1)
            //     .toString()
            //     .padStart(2, '0')}`;
            // const minutesString = `${timeObject.minutes
            //     .toString()
            //     .padStart(2, '0')}`;

            // const newEvent: AgendaEvent = {
            //     id: 'draft',
            //     startDate: `${timeString}`,
            //     end: `${timeObject.date} ${hourString}:${minutesString}:00`,
            //     title: 'New Event',
            //     color: 'white',
            // };

            // if (timeObject.date) {
            //     if (eventsByDate[timeObject.date]) {
            //         eventsByDate[timeObject.date] = [
            //             ...eventsByDate[timeObject.date],
            //             newEvent,
            //         ];
            //         setEventsByDate(eventsByDate);
            //     } else {
            //         eventsByDate[timeObject.date] = [newEvent];
            //         setEventsByDate(eventsByDate);
            //     }
            // }
        }, []);

    const onBackgroundLongPressOut: TimelineProps['onBackgroundLongPressOut'] =
        useCallback((timeString: string, timeObject: any) => {
            console.log('onBackgroundLongPressOut');
            console.log('timeString', timeString);
            console.log('timeObject', timeObject);
            // Alert.prompt('New Event', 'Enter event title', [
            //     {
            //         text: 'Cancel',
            //         onPress: () => {
            //             if (timeObject.date) {
            //                 eventsByDate[timeObject.date] = filter(
            //                     eventsByDate[timeObject.date],
            //                     e => e.id !== 'draft'
            //                 );
            //                 setEventsByDate(eventsByDate);
            //             }
            //         },
            //     },
            //     {
            //         text: 'Create',
            //         onPress: eventTitle => {
            //             if (timeObject.date) {
            //                 const draftEvent = find(
            //                     eventsByDate[timeObject.date],
            //                     {
            //                         id: 'draft',
            //                     }
            //                 );
            //                 if (draftEvent) {
            //                     draftEvent.id = undefined;
            //                     draftEvent.title =
            //                         eventTitle ?? 'New Event';
            //                     draftEvent.color = 'lightgreen';
            //                     eventsByDate[timeObject.date] = [
            //                         ...eventsByDate[timeObject.date],
            //                     ];
            //                     setEventsByDate(eventsByDate);
            //                 }
            //             }
            //         },
            //     },
            // ]);
        }, []);

    const [setCreateModalVisible, createModal] = useAgendaCreateModal();
    return (
        <View style={{ flex: 1 }}>
            {createModal}
            <CalendarProvider
                date={currentDate}
                onDateChanged={onDateChanged}
                onMonthChange={onMonthChange}
                showTodayButton
                disabledOpacity={0.6}
                // numberOfDays={3}
            >
                <ExpandableCalendar
                    firstDay={1}
                    // leftArrowImageSource={require('../test/react-native-calendar-screen/example/src/img/previous.png')}
                    // rightArrowImageSource={require('../test/react-native-calendar-screen/example/src/img/next.png')}
                    markedDates={marked}
                />
                <TimelineList
                    events={eventsByDate}
                    timelineProps={{
                        format24h: true,
                        onBackgroundLongPress,
                        onBackgroundLongPressOut,
                        // scrollToFirst: true,
                        // start: 0,
                        // end: 24,
                        unavailableHours: [
                            // { start: 0, end: 6 },
                            // { start: 22, end: 24 },
                        ],
                        overlapEventsSpacing: 8,
                        rightEdgeSpacing: 24,
                    }}
                    showNowIndicator
                    scrollToNow
                    scrollToFirst
                    initialTime={INITIAL_TIME}
                />
            </CalendarProvider>
        </View>
    );
};

export default PlanScreen;
