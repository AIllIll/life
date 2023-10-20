import moment from 'moment';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
    Alert,
    Dimensions,
    KeyboardAvoidingView,
    Modal,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View,
} from 'react-native';

import { useAppDispatch } from '@src/hooks';
import { createOne } from '@src/store/slices/agendas';
import { AgendaCreateFormData } from '@src/types/entities';

export const useAgendaCreateModal = (): [
    React.Dispatch<React.SetStateAction<boolean>>,
    JSX.Element
] => {
    const dispatch = useAppDispatch();

    const [visible, setVisible] = useState(false);
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            startTimestamp: +moment(),
            endTimestamp: +moment().add(10, 'minute'),
            title: '',
            content: '',
            memo: '',
        },
    });
    const onCancel = () => {
        setVisible(false);
    };
    const onSave = (data: AgendaCreateFormData) => {
        console.log('data', data);
        const agenda = {
            ...data,
            completed: false,
        };
        dispatch(createOne(agenda)).then(() => setVisible(false));
    };

    return [
        setVisible,
        <Modal
            animationType="slide"
            // transparent={true}
            visible={visible}
            onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setVisible(!visible);
            }}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <View style={styles.header}>
                    <TouchableWithoutFeedback
                        style={styles.headerButton}
                        onPress={onCancel}>
                        <Text>cancel</Text>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback
                        style={styles.headerButton}
                        onPress={handleSubmit(onSave)}>
                        <Text style={styles.headerButtonConfirm}> save </Text>
                    </TouchableWithoutFeedback>
                </View>

                <View style={styles.body}>
                    <Controller
                        control={control}
                        rules={{
                            required: true,
                            maxLength: 15,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={styles.formItem}
                                placeholder="Title"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value as string}
                            />
                        )}
                        name="title"
                    />
                    {errors.title && (
                        <Text style={styles.formHint}>This is required.</Text>
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
                        name="content"
                    />
                    {errors.content && (
                        <Text style={styles.formHint}>This is required.</Text>
                    )}

                    <Controller
                        control={control}
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
                        name="memo"
                    />
                </View>
            </KeyboardAvoidingView>
        </Modal>,
    ];
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: Dimensions.get('window').height,
        padding: 8,
        // borderWidth: 10,
    },
    header: {
        height: 30,
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        // borderWidth: 1,
    },
    headerButton: {
        // width: ,
        padding: 4,
        // borderWidth: 1,
    },
    headerButtonConfirm: {
        color: 'blue',
    },
    body: {
        height: Dimensions.get('window').height - 30 - 20, // no idea why there is an extra 15, might be the status bar
        width: '100%',
    },
    formItem: {
        borderBottomWidth: 0.5,
        borderColor: 'grey',
        alignContent: 'flex-start',
    },
    formHint: {
        color: 'red',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '80%',
        display: 'flex',
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
});
