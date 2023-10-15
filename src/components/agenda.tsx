import React, { useCallback, useState } from 'react';
import { Alert, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {
    Agenda,
    DateData,
    AgendaEntry,
    AgendaSchedule,
} from 'react-native-calendars';
import testIDs from '@src/test/testIDs';
import moment from 'moment';

type AgendaProps = {};

const timeToString = (time: number): string => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
};

const renderItem = (reservation: AgendaEntry, isFirst: boolean) => {
    const fontSize = isFirst ? 16 : 14;
    const color = isFirst ? 'black' : '#43515c';

    return (
        <TouchableOpacity
            testID={testIDs.agenda.ITEM}
            style={[styles.item, { height: reservation.height }]}
            onPress={() => Alert.alert(reservation.name)}>
            <Text style={{ fontSize, color }}>{reservation.name}</Text>
        </TouchableOpacity>
    );
};
const renderEmptyDate = () => {
    return (
        <View style={styles.emptyDate}>
            <Text>This is empty date!</Text>
        </View>
    );
};

const rowHasChanged = (r1: AgendaEntry, r2: AgendaEntry) => {
    return r1.name !== r2.name;
};

const MyAgenda = ({}: AgendaProps): JSX.Element => {
    const [data, setData] = useState<AgendaSchedule>({});
    const loadItemsForMonth = useCallback(
        (day: DateData) => {
            console.log('loadItemsForMonth');
            console.log(data);
            const items = data || {};
            // setTimeout(() => {
            //     for (let i = -15; i < 85; i++) {
            //         const time = day.timestamp + i * 24 * 60 * 60 * 1000;
            //         const strTime = timeToString(time);

            //         if (!items[strTime]) {
            //             items[strTime] = [];

            //             const numItems = Math.floor(Math.random() * 3 + 1);
            //             for (let j = 0; j < numItems; j++) {
            //                 items[strTime].push({
            //                     name: 'Item for ' + strTime + ' #' + j,
            //                     height: Math.max(
            //                         50,
            //                         Math.floor(Math.random() * 150)
            //                     ),
            //                     day: strTime,
            //                 });
            //             }
            //         }
            //     }

            //     const newItems: AgendaSchedule = {};
            //     Object.keys(items).forEach(key => {
            //         newItems[key] = items[key];
            //     });
            //     setData(newItems);
            // }, 1000);
        },
        [data]
    );

    return (
        <Agenda
            testID={testIDs.agenda.CONTAINER}
            items={data}
            loadItemsForMonth={loadItemsForMonth}
            selected={moment().format('YYYY-MM-DD')}
            renderItem={renderItem}
            renderEmptyDate={renderEmptyDate}
            rowHasChanged={rowHasChanged}
            showClosingKnob={true}
            // markingType={'period'}
            // markedDates={{
            //    '2017-05-08': {textColor: '#43515c'},
            //    '2017-05-09': {textColor: '#43515c'},
            //    '2017-05-14': {startingDay: true, endingDay: true, color: 'blue'},
            //    '2017-05-21': {startingDay: true, color: 'blue'},
            //    '2017-05-22': {endingDay: true, color: 'gray'},
            //    '2017-05-24': {startingDay: true, color: 'gray'},
            //    '2017-05-25': {color: 'gray'},
            //    '2017-05-26': {endingDay: true, color: 'gray'}}}
            // monthFormat={'yyyy'}
            // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
            // renderDay={this.renderDay}
            // hideExtraDays={false}
            // showOnlySelectedDayItems
            // reservationsKeyExtractor={this.reservationsKeyExtractor}
        />
    );
};

const styles = StyleSheet.create({
    item: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17,
    },
    emptyDate: {
        height: 15,
        flex: 1,
        paddingTop: 30,
    },
    customDay: {
        margin: 10,
        fontSize: 24,
        color: 'green',
    },
    dayItem: {
        marginLeft: 34,
    },
});

export default MyAgenda;
