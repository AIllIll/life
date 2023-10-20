import React, { Children, ReactElement } from 'react';
import {
    Dimensions,
    KeyboardAvoidingView,
    Modal,
    ModalProps,
    Platform,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    TouchableWithoutFeedbackProps,
    View,
} from 'react-native';

export interface FullScreenModalExtraProps {
    leftButtonProps?: TouchableWithoutFeedbackProps & { text: string };
    rightButtonProps?: TouchableWithoutFeedbackProps & { text: string };
}
export type FullScreenModalProps = FullScreenModalExtraProps & ModalProps;

const FullScreenModal: React.FC<FullScreenModalProps> = props => {
    return (
        <Modal
            animationType="slide"
            // transparent={true}
            visible={props.visible}
            onRequestClose={props.onRequestClose}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <View style={styles.header}>
                    <TouchableWithoutFeedback
                        {...props.leftButtonProps}
                        style={styles.headerButton}>
                        <Text>{props.leftButtonProps?.text}</Text>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback
                        style={styles.headerButton}
                        {...props.rightButtonProps}>
                        <Text style={styles.headerButtonConfirm}>
                            <Text>{props.rightButtonProps?.text}</Text>
                        </Text>
                    </TouchableWithoutFeedback>
                </View>
                <View style={styles.body}>{props.children}</View>
            </KeyboardAvoidingView>
        </Modal>
    );
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
        color: '#2196F3',
    },
    body: {
        height: Dimensions.get('window').height - 30 - 20, // no idea why there is an extra 15, might be the status bar
        width: '100%',
    },
});

export default FullScreenModal;
