import React from 'react';
import { HomeDrawerParamList } from '@src/types';
import { DrawerScreenProps } from '@react-navigation/drawer';
import ExpandableCalendarScreen from './example/src/screens/expandableCalendarScreen';
import CalendarListScreen from './example/src/screens/calendarListScreen';
import PlaygroundScreen from './example/src/screens/playgroundScreen';
import TimelineCalendarScreen from './example/src/screens/timelineCalendarScreen';
import AgendaScreen from './example/src/screens/agendaScreen';

const ReactNativeCalendarScreen = ({
    navigation,
    route,
}: DrawerScreenProps<
    HomeDrawerParamList,
    'react-native-calendar'
>): JSX.Element => {
    // return <ExpandableCalendarScreen />;
    // return <CalendarListScreen />;
    // return <PlaygroundScreen />;
    // return <AgendaScreen />;
    return <TimelineCalendarScreen />;
};
export default ReactNativeCalendarScreen;
