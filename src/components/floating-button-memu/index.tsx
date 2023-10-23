/**
 * https://github.com/oblador/react-native-vector-icons#bundled-icon-sets
 */

import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
    Animated,
    GestureResponderEvent,
    StyleSheet,
    View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export interface MenuItemIconProps {
    iconName?: string;
    iconSize?: number;
    fontSize?: number;
    color?: string;
}

export interface MenuItem extends MenuItemIconProps {
    onPress: (event: GestureResponderEvent) => void;
}
export interface FloatingButtonMenu
    extends Omit<MenuItemIconProps, 'iconName'> {
    menuItems: MenuItem[];
}

const FloatingButtonMenu: React.FC<FloatingButtonMenu> = ({
    menuItems,
    iconSize = 56,
    fontSize = 24,
    color = '#5390D9',
}) => {
    const maxIconSize = Math.max(
        ...menuItems.map(o => o.iconSize || 0),
        iconSize
    );

    const slideAnimation = useRef(new Animated.Value(0)).current;
    const [toggled, setToggled] = useState<boolean>(false);
    const onToggleMenu = useCallback(
        (open: boolean) => {
            // console.log('open', open);
            Animated.timing(slideAnimation, {
                toValue: open ? maxIconSize + 8 : 0,
                duration: 100,
                useNativeDriver: false,
            }).start();
        },
        [slideAnimation]
    );
    useEffect(() => {
        console.log('toggled', toggled);
        onToggleMenu(toggled);
    }, [toggled]);

    return (
        <View
            style={[
                styles.container,
                {
                    width: maxIconSize,
                },
            ]}>
            {menuItems.map(
                (
                    {
                        iconName = 'question',
                        iconSize = 56,
                        fontSize = 24,
                        color = '#5390D9',
                        onPress,
                    },
                    key
                ) => (
                    <Animated.View
                        key={key}
                        style={[
                            styles.menuItem,
                            {
                                marginBottom: slideAnimation,
                                width: maxIconSize + 16,
                            },
                        ]}>
                        <Icon
                            name={iconName}
                            style={[
                                styles.icon,
                                {
                                    position: 'absolute',
                                    fontSize,
                                    width: iconSize,
                                    borderRadius: iconSize / 2,
                                    backgroundColor: color,
                                },
                            ]}
                            onPress={onPress}
                        />
                    </Animated.View>
                )
            )}

            <Icon
                name={toggled ? 'arrow-collapse-down' : 'arrow-expand-up'}
                style={[
                    styles.icon,
                    {
                        fontSize,
                        width: iconSize,
                        borderRadius: iconSize / 2,
                        backgroundColor: color,
                    },
                ]}
                onPress={() => setToggled(!toggled)}
            />
        </View>
    );
};
export default FloatingButtonMenu;

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 16,
        right: 16,
        backgroundColor: 'rgba(0,0,0,0)',
        // borderWidth: 1,
    },
    menuItem: {
        backgroundColor: 'rgba(0,0,0,0)',
    },
    icon: {
        backgroundColor: '#5390D9',
        color: 'white',
        borderRadius: 28,
        width: 56,
        height: 56,
        fontSize: 24,
        lineHeight: 56,
        textAlign: 'center',
    },
});
