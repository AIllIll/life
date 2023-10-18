import React from 'react';

import { DrawerScreenProps } from '@react-navigation/drawer';
import { HomeDrawerParamList } from '@src/types';

import AgendaScreen from './example/src/screens/agendaScreen';
import CalendarListScreen from './example/src/screens/calendarListScreen';
import ExpandableCalendarScreen from './example/src/screens/expandableCalendarScreen';
import PlaygroundScreen from './example/src/screens/playgroundScreen';
import TimelineCalendarScreen from './example/src/screens/timelineCalendarScreen';

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
