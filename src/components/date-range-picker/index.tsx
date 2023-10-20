import moment from 'moment';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DatePicker from 'react-native-date-picker';

import FullScreenModal from '../full-screen-modal';

export interface DateRangePickerProps {
    timeRange: [number, number];
    onChange: (...event: any[]) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
    timeRange,
    onChange,
}) => {
    const begin = useMemo(() => new Date(timeRange[0]), [timeRange]);
    const end = useMemo(() => new Date(timeRange[1]), [timeRange]);
    const [editing, setEditing] = useState<
        'begin' | 'end' | null | undefined | false
    >(false);
    const [editingDate, setEditingDate] = useState<Date>(new Date());
    useEffect(() => {
        if (editing == 'begin') {
            setEditingDate(begin);
        } else if (editing == 'end') {
            setEditingDate(end);
        }
    }, [editing]);

    useEffect(() => {
        console.log('timeRange', timeRange);
    }, [timeRange]);

    return (
        <View>
            <FullScreenModal
                visible={!!editing}
                leftButtonProps={{
                    text: 'cancel',
                    onPress: () => {
                        setEditing(false);
                    },
                }}
                rightButtonProps={{
                    text: 'save',
                    onPress: () => {
                        onChange(
                            (editing == 'begin'
                                ? [editingDate, end]
                                : [begin, editingDate]
                            ).map(t => +moment(t))
                        );
                        setEditing(false);
                    },
                }}>
                <DatePicker
                    style={{ borderWidth: 0.5 }}
                    onDateChange={setEditingDate}
                    date={editing == 'begin' ? begin : end}
                    androidVariant="nativeAndroid"
                    mode="datetime"
                    is24hourSource="device"
                    // onBlur={onBlur}
                    // onChangeText={onChange}
                    // date={value}
                />
            </FullScreenModal>
            <View style={styles.rangeWrapper}>
                <TouchableOpacity
                    style={styles.dateTimeWrapper}
                    onPress={() => {
                        setEditing('begin');
                    }}>
                    <Text style={styles.time}>
                        {moment(begin).format('HH:mm:ss')}
                    </Text>
                    <Text>{moment(begin).format('YYYY-MM-DD dddd')}</Text>
                </TouchableOpacity>
                <Text>——</Text>
                <TouchableOpacity
                    style={styles.dateTimeWrapper}
                    onPress={() => {
                        setEditing('end');
                    }}>
                    <Text style={styles.time}>
                        {moment(end).format('HH:mm:ss')}
                    </Text>
                    <Text>{moment(end).format('YYYY-MM-DD dddd')}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
export default DateRangePicker;

const styles = StyleSheet.create({
    rangeWrapper: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
    },
    dateTimeWrapper: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 16,
        // borderWidth: 0.5,
    },
    time: {
        fontWeight: 'bold',
        color: 'black',
        fontSize: 16,
    },
});
