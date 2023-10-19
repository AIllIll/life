import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, View } from 'react-native';

export const useAgendaCreateModal = (): [
    React.Dispatch<React.SetStateAction<boolean>>,
    JSX.Element
] => {
    const [visible, setVisible] = useState(false);
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
            <View style={styles.centeredView}>
                <View
                // style={styles.modalView}
                >
                    <Text>this is a modal</Text>
                </View>
            </View>
        </Modal>,
    ];
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
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
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    input: {
        borderStyle: 'dashed',
        borderWidth: 1,
        width: '100%',
    },
});
