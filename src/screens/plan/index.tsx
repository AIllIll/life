import groupBy from 'lodash/groupBy';
import moment from 'moment';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
    Alert,
    Dimensions,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import {
    CalendarProvider,
    CalendarUtils,
    ExpandableCalendar,
    TimelineEventProps,
    TimelineList,
    TimelineProps,
} from 'react-native-calendars';

import { FAB } from '@rneui/themed';
import FloatingButtonMenu from '@src/components/floating-button-memu';
import FullScreenModal from '@src/components/full-screen-modal';
import { useAppDispatch, useAppSelector } from '@src/hooks';
import {
    deleteAgenda,
    fetchAllAgendas,
    selectAgendaById,
    selectAgendaDates,
    selectAgendas,
} from '@src/store/slices/agendas';

import { getCalendarDateString, getTime } from './helper';
import AgendaCreateModal from './modals/create';

import type { PlanScreenProps } from '@src/types';
const INITIAL_TIME = { hour: 9, minutes: 0 };

const PlanScreen = ({ navigation, route }: PlanScreenProps): JSX.Element => {
    const dispatch = useAppDispatch();

    const [currentDate, setCurrentDate] = useState(
        getCalendarDateString(+moment())
    );
    const [selectedAgendaId, setSelectedAgendaId] = useState<
        string | undefined | null
    >(null);
    const [createModalVisible, setCreateModalVisible] =
        useState<boolean>(false);
    const [updateModalVisible, setUpdateModalVisible] =
        useState<boolean>(false);

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

    const agendas = useAppSelector(selectAgendas);
    const eventsByDate = useMemo(() => {
        const timelineEvents: TimelineEventProps[] = agendas.map(a => ({
            id: a.id,
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

    const selectedAgenda = useAppSelector(
        state => selectedAgendaId && selectAgendaById(state, selectedAgendaId)
    );

    // 获取所有日程
    useEffect(() => {
        dispatch(fetchAllAgendas());
    }, []);

    const [newAgendaStartTimeString, setNewAgendaStartTimeString] = useState(
        moment()
    );

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
        <View style={styles.container}>
            {createModalVisible && (
                <AgendaCreateModal
                    visible={true}
                    onClose={() => setCreateModalVisible(false)}
                    newAgendaStartTimeString={newAgendaStartTimeString}
                />
            )}
            <CalendarProvider
                date={currentDate}
                onDateChanged={onDateChanged}
                onMonthChange={onMonthChange}
                showTodayButton
                disabledOpacity={0.6}
                // numberOfDays={3}
            >
                <ExpandableCalendar
                    style={styles.calendar}
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
                        overlapEventsSpacing: 4,
                        rightEdgeSpacing: 60,
                        // timelineLeftInset: 40,
                        // numberOfDays: 2,
                        renderEvent: e => {
                            return (
                                <TouchableWithoutFeedback
                                    disabled={e.id == selectedAgendaId}
                                    onLongPress={({
                                        nativeEvent: { locationX, locationY },
                                    }) => {
                                        console.log(
                                            'long press event',
                                            locationX,
                                            locationY,
                                            e.id,
                                            selectedAgendaId
                                        );
                                        setSelectedAgendaId(e.id);
                                    }}>
                                    <View style={styles.eventContainer}>
                                        <View style={styles.eventBody}>
                                            <Text style={styles.eventBodyTitle}>
                                                {e.title}
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableWithoutFeedback>
                            );
                        },
                    }}
                    showNowIndicator
                    scrollToNow
                    scrollToFirst
                    initialTime={INITIAL_TIME}
                />
            </CalendarProvider>
            <FloatingButtonMenu
                menuItems={[
                    {
                        iconName: 'washing-machine',
                        color: '#7AF0DB',
                        onPress: () => console.log('washing-machine'),
                    },
                    {
                        iconName: 'shower-head',
                        color: '#A5EF7B',
                        onPress: () => {
                            console.log('shower-head');
                        },
                    },
                    {
                        iconName: 'food-takeout-box-outline',
                        color: '#F0C369',
                        onPress: () => {
                            console.log('food-takeout-box-outline');
                        },
                    },
                    {
                        iconName: 'weight-lifter',
                        color: '#F09283',
                        onPress: () => {
                            console.log('weight-lifter');
                        },
                    },
                ]}
                color="#1ABCED"
            />
            {/* <FAB
                loading={FABLoading}
                visible
                // icon={{ name: 'chevron-left', color: 'white' }}
                icon={{ name: 'add', color: 'white' }}
                // size="small"
                placement="right"
                // style={{ position: 'absolute' }}
            /> */}
            {/* <FAB
                loading={FABLoading}
                visible
                icon={{ name: 'undo', color: 'white' }}
                // size="small"
                placement="right"
                style={styles.FABUndo}
            /> */}

            <FullScreenModal
                visible={!!selectedAgendaId}
                animationType="fade"
                withoutHeader
                opacity={0.1}
                onRequestClose={() => setSelectedAgendaId(null)}
                onPressBackground={() => setSelectedAgendaId(null)}>
                <FAB
                    icon={{ name: 'edit', color: 'white' }}
                    title={' edit '}
                    style={[styles.FABEdit]}
                    onPress={() => {
                        console.log('press edit');
                    }}
                />
                <FAB
                    icon={{ name: 'delete', color: 'white' }}
                    title={'delete'}
                    style={[styles.FABDelete]}
                    onPress={() => {
                        if (selectedAgenda) {
                            dispatch(deleteAgenda(selectedAgenda)).then(() =>
                                setSelectedAgendaId(null)
                            );
                        } else {
                            setSelectedAgendaId(null);
                        }
                    }}
                />
            </FullScreenModal>
        </View>
    );
};

export default PlanScreen;

const styles = StyleSheet.create({
    container: { flex: 1 },
    calendar: {},
    FABUndo: {
        marginBottom: 90,
    },
    FABEdit: {
        marginTop: '60%',
        left: Dimensions.get('window').width / 2 - 100,
    },
    FABDelete: {
        marginTop: '30%',
        left: Dimensions.get('window').width / 2 - 100,
    },
    eventContainer: {
        width: '100%',
        height: '100%',
        paddingRight: 4,
        paddingBottom: 4,
    },
    eventBody: {
        borderColor: 'black',
        borderWidth: 1,
        // backgroundColor: 'blue',
        width: '100%',
        height: '100%',
    },
    eventBodyTitle: {},
});
