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

import { FAB } from '@rneui/themed';
import { useAppDispatch, useAppSelector } from '@src/hooks';
import {
    fetchAll,
    selectAgendaDates,
    selectAgendas,
} from '@src/store/slices/agendas';

import { getCalendarDateString, getTime } from './helper';
import AgendaCreateModal from './modals/create';

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

    // 获取所有日程
    useEffect(() => {
        dispatch(fetchAll());
    }, []);

    const [newAgendaStartTimeString, setNewAgendaStartTimeString] = useState(
        moment()
    );

    const [createModalVisible, setCreateModalVisible] = useState(false);

    // logs
    useEffect(() => {
        console.log('marked', marked);
    }, [marked]);

    useEffect(() => {
        console.log('eventsByDate', eventsByDate);
    }, [eventsByDate]);

    const onDateChanged = (date: string, source: string) => {
        console.log('TimelineCalendarScreen onDateChanged: ', date, source);
        setCurrentDate(date);
    };

    const onMonthChange = (month: any, updateSource: any) => {
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
            setNewAgendaStartTimeString(moment(timeString));
        }, []);

    const onBackgroundLongPressOut: TimelineProps['onBackgroundLongPressOut'] =
        useCallback((timeString: string, timeObject: any) => {
            console.log('onBackgroundLongPressOut');
            console.log('timeString', timeString);
            console.log('timeObject', timeObject);
            setCreateModalVisible(true);
        }, []);

    return (
        <View style={{ flex: 1 }}>
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
            {createModalVisible && (
                <AgendaCreateModal
                    visible={true}
                    onClose={() => setCreateModalVisible(false)}
                    newAgendaStartTimeString={newAgendaStartTimeString}
                />
            )}
            <FAB
                loading
                visible
                icon={{ name: 'add', color: 'white' }}
                size="small"
            />
        </View>
    );
};

export default PlanScreen;
