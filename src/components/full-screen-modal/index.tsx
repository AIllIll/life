import { isUndefined } from 'lodash';
import React from 'react';
import {
    Dimensions,
    GestureResponderEvent,
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

interface FullScreenModalExtraProps {
    leftButtonProps?: TouchableWithoutFeedbackProps & { text: string };
    rightButtonProps?: TouchableWithoutFeedbackProps & { text: string };
    withoutHeader?: boolean;
    onPressBackground?: ((event: GestureResponderEvent) => void) | undefined;
    opacity?: number;
}
export type FullScreenModalProps = FullScreenModalExtraProps & ModalProps;

const FullScreenModal: React.FC<FullScreenModalProps> = props => {
    return (
        <Modal animationType="slide" transparent={true} {...props}>
            <KeyboardAvoidingView
                style={[
                    styles.container,
                    props.opacity != undefined && {
                        backgroundColor: `rgba(0,0,0,${props.opacity})`,
                    },
                ]}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                {!props.withoutHeader && (
                    <View style={styles.header}>
                        <TouchableWithoutFeedback
                            {...props.leftButtonProps}
                            style={styles.headerButton}>
                            <Text
                                style={[
                                    styles.headerButtonText,
                                    styles.headerButtonCancel,
                                ]}>
                                {props.leftButtonProps?.text}
                            </Text>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback
                            style={styles.headerButton}
                            {...props.rightButtonProps}>
                            <Text
                                style={[
                                    styles.headerButtonText,
                                    styles.headerButtonConfirm,
                                ]}>
                                {props.rightButtonProps?.text}
                            </Text>
                        </TouchableWithoutFeedback>
                    </View>
                )}
                <TouchableWithoutFeedback onPress={props.onPressBackground}>
                    <View style={[styles.body]}>{props.children}</View>
                </TouchableWithoutFeedback>
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
        backgroundColor: 'white',
        // padding: 8,
        // borderWidth: 10,
    },
    header: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: 8,
        // borderWidth: 1,
    },
    headerButton: {
        // width: ,
        padding: 8,
        borderWidth: 1,
    },
    headerButtonText: {
        fontSize: 20,
    },
    headerButtonCancel: {
        color: 'black',
    },
    headerButtonConfirm: {
        color: '#2196F3',
    },
    body: {
        flex: 1,
        // height: Dimensions.get('window').height - 30 - 20, // no idea why there is an extra 15, might be the status bar
        width: '100%',
        paddingTop: 24,
        // borderWidth: 1,
    },
});

export default FullScreenModal;
