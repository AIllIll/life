import React, { useCallback } from 'react';
import {
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

import { FAB } from '@rneui/themed';
import DateRangePicker from '@src/components/date-range-picker';
import FullScreenModal, {
    FullScreenModalProps,
} from '@src/components/full-screen-modal';
import { useAppDispatch, useAppSelector } from '@src/hooks';
import { deleteAgenda, selectAgendaById } from '@src/store/slices/agendas';

export interface AgendaCreateModalExtraProps {
    onClose: Function;
    agendaId: string | null;
}
export type AgendaCreateModalProps = AgendaCreateModalExtraProps &
    FullScreenModalProps;

const AgendaDetailModal: React.FC<AgendaCreateModalProps> = ({
    onClose,
    agendaId,
}) => {
    const dispatch = useAppDispatch();
    const agenda = useAppSelector(
        state => agendaId && selectAgendaById(state, agendaId)
    );

    const onEdit = () => {
        console.log('edit');
    };
    const onDelete = useCallback(async () => {
        agenda && (await dispatch(deleteAgenda(agenda)));
        onClose();
    }, [agenda, onClose]);

    return (
        <FullScreenModal
            animationType="slide"
            withoutHeader={true}
            opacity={0.96}
            visible={!!agenda}
            onRequestClose={() => onClose()}
            // onPressBackground={() => onClose()}
        >
            <View style={styles.container}>
                <View style={styles.leftBlock}>
                    <TouchableOpacity
                        style={[
                            styles.actionButton,
                            {
                                backgroundColor: '#DEFC90',
                            },
                        ]}
                        activeOpacity={0.5}
                        onPress={() => onEdit()}>
                        <Icon name="edit" style={styles.actionButtonIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.actionButton,
                            {
                                backgroundColor: '#E1615F',
                            },
                        ]}
                        activeOpacity={0.5}
                        onPress={() => onDelete()}>
                        <Icon name="delete" style={styles.actionButtonIcon} />
                    </TouchableOpacity>
                </View>
                {agenda && (
                    <ScrollView style={styles.rightBlock}>
                        <Text style={styles.title}>{agenda.title}</Text>
                        <Text style={styles.summary}>{agenda.summary}</Text>
                        <DateRangePicker
                            timeRange={[
                                agenda.startTimestamp,
                                agenda.endTimestamp,
                            ]}
                            disable
                        />
                        <Text style={styles.memo}>{agenda.memo}</Text>
                        {/* {'asadqqqweeretyjhasdsadasdasfa'
                            .split('')
                            .map((_, i) => (
                                <Text key={i} style={styles.summary}>
                                    {i}
                                    {agenda.summary}
                                </Text>
                            ))} */}
                    </ScrollView>
                )}
                <FAB
                    icon={{ name: 'close', color: 'white' }}
                    title={'close'}
                    // size="small"
                    placement="right"
                    style={{ marginBottom: 48 }}
                    onPress={() => onClose()}
                />
            </View>
        </FullScreenModal>
    );
};

export default AgendaDetailModal;

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        height: '100%',
        width: '100%',
        // borderWidth: 1,
    },
    leftBlock: {
        height: '100%',
        // width: Dimensions.get('window').width - 200,
        width: 64,
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        // borderWidth: 1,
    },
    actionButton: {
        flex: 1,
        width: 64,
        lineHeight: 64,
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
    },
    actionButtonIcon: {
        fontSize: 28,
        width: 64,
        lineHeight: 64,
        textAlign: 'center',
    },

    rightBlock: {
        // borderWidth: 1,
        // height: '100%',
        width: Dimensions.get('window').width - 64,
        borderLeftWidth: 1,
        borderColor: '#D4D4D4',
        // paddingTop: 16,
        paddingLeft: 16,
        paddingRight: 16,
    },
    title: {
        fontSize: 42,
        marginTop: 48,
        borderBottomWidth: 1,
        borderColor: '#D7D7D7',
    },
    summary: {
        fontSize: 18,
        marginTop: 24,
        borderBottomWidth: 1,
        borderColor: '#D7D7D7',
    },
    memo: {
        fontSize: 18,
        borderTopWidth: 1,
        borderColor: '#D7D7D7',
    },
});
