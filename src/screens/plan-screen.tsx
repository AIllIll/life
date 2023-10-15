import React, { useCallback, useMemo, useState } from 'react';
import type { PlanScreenProps } from '@src/types';
import {
    CalendarProvider,
    CalendarUtils,
    ExpandableCalendar,
    TimelineEventProps,
    TimelineList,
    TimelineProps,
} from 'react-native-calendars';
import moment from 'moment';
import groupBy from 'lodash/groupBy';
import filter from 'lodash/filter';
import find from 'lodash/find';
import {
    timelineEvents,
    getDate,
} from './test/react-native-calendar-screen/example/src/mocks/timelineEvents';
import { Alert } from 'react-native';

const INITIAL_TIME = { hour: 9, minutes: 0 };
const EVENTS: TimelineEventProps[] = timelineEvents;

const PlanScreen = ({ navigation, route }: PlanScreenProps): JSX.Element => {
    const [currentDate, setCurrentDate] = useState(getDate());
    const [eventsByDate, setEventsByDate] = useState<{
        [key: string]: TimelineEventProps[];
    }>(groupBy(EVENTS, e => CalendarUtils.getCalendarDateString(e.start)));

    const marked = useMemo(() => {
        return {
            [`${getDate(-1)}`]: { marked: true },
            [`${getDate()}`]: { marked: true },
            [`${getDate(1)}`]: { marked: true },
            [`${getDate(2)}`]: { marked: true },
            [`${getDate(4)}`]: { marked: true },
        };
    }, []);

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

    const createNewEvent: TimelineProps['onBackgroundLongPress'] = useCallback(
        (timeString: string, timeObject: any) => {
            const hourString = `${(timeObject.hour + 1)
                .toString()
                .padStart(2, '0')}`;
            const minutesString = `${timeObject.minutes
                .toString()
                .padStart(2, '0')}`;

            const newEvent = {
                id: 'draft',
                start: `${timeString}`,
                end: `${timeObject.date} ${hourString}:${minutesString}:00`,
                title: 'New Event',
                color: 'white',
            };

            if (timeObject.date) {
                if (eventsByDate[timeObject.date]) {
                    eventsByDate[timeObject.date] = [
                        ...eventsByDate[timeObject.date],
                        newEvent,
                    ];
                    setEventsByDate(eventsByDate);
                } else {
                    eventsByDate[timeObject.date] = [newEvent];
                    setEventsByDate(eventsByDate);
                }
            }
        },
        [eventsByDate]
    );

    const approveNewEvent: TimelineProps['onBackgroundLongPressOut'] =
        useCallback(
            (_timeString: string, timeObject: any) => {
                Alert.prompt('New Event', 'Enter event title', [
                    {
                        text: 'Cancel',
                        onPress: () => {
                            if (timeObject.date) {
                                eventsByDate[timeObject.date] = filter(
                                    eventsByDate[timeObject.date],
                                    e => e.id !== 'draft'
                                );

                                setEventsByDate(eventsByDate);
                            }
                        },
                    },
                    {
                        text: 'Create',
                        onPress: eventTitle => {
                            if (timeObject.date) {
                                const draftEvent = find(
                                    eventsByDate[timeObject.date],
                                    {
                                        id: 'draft',
                                    }
                                );
                                if (draftEvent) {
                                    draftEvent.id = undefined;
                                    draftEvent.title =
                                        eventTitle ?? 'New Event';
                                    draftEvent.color = 'lightgreen';
                                    eventsByDate[timeObject.date] = [
                                        ...eventsByDate[timeObject.date],
                                    ];

                                    setEventsByDate(eventsByDate);
                                }
                            }
                        },
                    },
                ]);
            },
            [eventsByDate]
        );
    const timelineProps: Partial<TimelineProps> = {
        format24h: true,
        onBackgroundLongPress: createNewEvent,
        onBackgroundLongPressOut: approveNewEvent,
        // scrollToFirst: true,
        // start: 0,
        // end: 24,
        unavailableHours: [
            { start: 0, end: 6 },
            { start: 22, end: 24 },
        ],
        overlapEventsSpacing: 8,
        rightEdgeSpacing: 24,
    };
    return (
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
                leftArrowImageSource={require('./test/react-native-calendar-screen/example/src/img/previous.png')}
                rightArrowImageSource={require('./test/react-native-calendar-screen/example/src/img/next.png')}
                markedDates={marked}
            />
            <TimelineList
                events={eventsByDate}
                timelineProps={timelineProps}
                showNowIndicator
                // scrollToNow
                scrollToFirst
                initialTime={INITIAL_TIME}
            />
        </CalendarProvider>
    );
};
export default PlanScreen;
