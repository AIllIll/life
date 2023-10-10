import React, { useState } from 'react';
import type { BackgroundTimerScreenProps, PlanScreenProps } from '../../types';
import BackgroundTimer from 'react-native-background-timer';
import moment from 'moment';
import { View, Button } from 'react-native';

function BackgroundTimerScreen({
    navigation,
    route,
}: BackgroundTimerScreenProps): JSX.Element {
    const [timer1, setTimer1] = useState(0);
    const [timer2, setTimer2] = useState(0);
    return (
        <View>
            <Button
                title="通用开始"
                onPress={() =>
                    BackgroundTimer.runBackgroundTimer(() => {
                        console.log(moment().format('通用YYYY-MM-DD HH:mm:ss'));
                    }, 3000)
                }
            />

            <Button
                title="通用停止"
                onPress={() => BackgroundTimer.stopBackgroundTimer()}
            />
            <Button
                title="android开始1"
                onPress={() => {
                    if (timer1 == 0)
                        setTimer1(
                            BackgroundTimer.setInterval(() => {
                                console.log(
                                    moment().format(
                                        '111111: YYYY-MM-DD HH:mm:ss'
                                    )
                                );
                            }, 1000)
                        );
                }}
            />

            <Button
                title="android停止1"
                onPress={() => {
                    BackgroundTimer.clearInterval(timer1);
                    setTimer1(0);
                }}
            />
            <Button
                title="android开始2"
                onPress={() => {
                    if (timer2 == 0)
                        setTimer2(
                            BackgroundTimer.setInterval(() => {
                                console.log(
                                    moment().format('2: YYYY-MM-DD HH:mm:ss')
                                );
                            }, 1000)
                        );
                }}
            />

            <Button
                title="android停止2"
                onPress={() => {
                    BackgroundTimer.clearInterval(timer2);
                    setTimer2(0);
                }}
            />
        </View>
    );
}
export default BackgroundTimerScreen;
