import moment, { Moment } from 'moment';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import DateRangePicker from '@src/components/date-range-picker';
import FullScreenModal, {
    FullScreenModalProps,
} from '@src/components/full-screen-modal';
import { useAppDispatch } from '@src/hooks';
import { createAgenda } from '@src/store/slices/agendas';
import { AgendaCreateFormData } from '@src/types/entities';

export interface AgendaCreateModalExtraProps {
    visible: boolean;
    onClose: Function;
    newAgendaStartTimeMoment: Moment;
}
export type AgendaCreateModalProps = AgendaCreateModalExtraProps &
    FullScreenModalProps;

const AgendaCreateModal: React.FC<AgendaCreateModalProps> = ({
    visible,
    onClose,
    newAgendaStartTimeMoment,
}) => {
    const dispatch = useAppDispatch();

    // const [newAgendaStartTimeString, setNewAgendaStartTimeString] = useState(
    //     moment()
    // );
    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<AgendaCreateFormData>({
        defaultValues: {
            title: '',
            summary: '',
            timeRange: [+moment(), +moment().add(60, 'minute')],
            memo: '',
        },
    });
    const onSave = (data: AgendaCreateFormData) => {
        console.log('data', data);
        const agenda = {
            ...data,
            completed: false,
        };
        console.log('agenda', agenda);
        dispatch(createAgenda(agenda)).then(() => onClose());
    };

    useEffect(() => {
        setValue('timeRange', [
            +newAgendaStartTimeMoment,
            +newAgendaStartTimeMoment.add(1, 'hour'),
        ]);
    }, [newAgendaStartTimeMoment]);

    return (
        <FullScreenModal
            leftButtonProps={{
                onPress: () => onClose(),
                text: 'cancel',
            }}
            rightButtonProps={{
                onPress: handleSubmit(onSave),
                text: ' save ',
            }}
            visible={visible}
            onRequestClose={() => onClose()}>
            <Controller
                control={control}
                name="title"
                rules={{
                    required: true,
                    maxLength: 15,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={[
                            styles.formItem,
                            { fontSize: 28, marginTop: 24 },
                        ]}
                        placeholder="Title"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value as string}
                    />
                )}
            />
            {errors.title && (
                <Text style={styles.formHint}>Title is required.</Text>
            )}

            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={styles.formItem}
                        placeholder="Summary"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
                name="summary"
            />
            {errors.summary && (
                <Text style={styles.formHint}>Summary is required.</Text>
            )}

            <Controller
                control={control}
                name="timeRange"
                rules={{
                    validate: (fieldValue, formValue) => {
                        console.log(fieldValue, formValue);
                        return fieldValue[0] < fieldValue[1];
                    },
                }}
                render={({ field: { onChange, value } }) => {
                    return (
                        <View style={styles.formItem}>
                            <DateRangePicker
                                timeRange={value}
                                onChange={onChange}
                            />
                        </View>
                    );
                }}
            />
            {errors.timeRange && (
                <Text style={styles.formHint}>Time range is incorrect.</Text>
            )}

            <Controller
                control={control}
                name="memo"
                rules={{
                    maxLength: 300,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={styles.formItem}
                        multiline
                        numberOfLines={4}
                        maxLength={300}
                        placeholder="Memo"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
            />
        </FullScreenModal>
    );
};

export default AgendaCreateModal;

const styles = StyleSheet.create({
    formItem: {
        borderBottomWidth: 0.5,
        borderColor: 'grey',
        alignContent: 'flex-start',
        fontSize: 18,
    },
    formHint: {
        color: 'red',
    },
    formItemDatePicker: {},
});
