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
    key: string;
    iconName?: string;
    iconSize?: number;
    fontSize?: number;
    color?: string;
}

export interface MenuItem extends MenuItemIconProps {
    onPress: (event: GestureResponderEvent) => void;
}
export interface FloatingButtonMenu
    extends Omit<MenuItemIconProps, 'iconName' | 'key'> {
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

    const verticalExpandAnimation = useRef(new Animated.Value(0)).current;
    const horizontalExpandAnimation = useRef(new Animated.Value(0)).current;
    const [menuToggled, setMenuToggled] = useState<boolean>(false);
    const [subMenuToggled, setSubMenuToggled] = useState<boolean>(false);
    const [expandedMenuItemKey, setExpandedMenuItemKey] = useState<
        string | null
    >(null);
    const onToggleMenu = useCallback(
        (open: boolean) => {
            Animated.timing(verticalExpandAnimation, {
                toValue: open ? maxIconSize + 8 : 0,
                duration: 100,
                useNativeDriver: false,
            }).start();
        },
        [verticalExpandAnimation]
    );
    const onToggleSubMenu = useCallback(
        (open: boolean) => {
            Animated.timing(horizontalExpandAnimation, {
                toValue: open ? maxIconSize + 8 : 0,
                duration: 100,
                useNativeDriver: false,
            }).start();
        },
        [horizontalExpandAnimation]
    );
    useEffect(() => {
        console.log('toggled', menuToggled);
        onToggleMenu(menuToggled);
        if (!menuToggled) {
            onToggleSubMenu(false);
        }
    }, [menuToggled]);
    useEffect(() => {
        console.log('subMenuToggled', subMenuToggled);
        onToggleSubMenu(subMenuToggled);
    }, [subMenuToggled]);

    return (
        <View
            style={[
                styles.container,
                {
                    width: maxIconSize + 2,
                },
            ]}>
            {menuItems.map(
                ({
                    key,
                    iconName = 'question',
                    iconSize = 56,
                    fontSize = 24,
                    color = '#5390D9',
                    onPress,
                }) => (
                    <Animated.View
                        key={key}
                        style={[
                            styles.menuItem,
                            {
                                marginBottom: verticalExpandAnimation,
                                width: maxIconSize + 16,
                            },
                        ]}>
                        {expandedMenuItemKey == key && (
                            <View style={[styles.subMenu]}>
                                {menuItems.map(
                                    ({
                                        key: subkey,
                                        iconName = 'question',
                                        iconSize = 56,
                                        fontSize = 24,
                                        color = '#5390D9',
                                        onPress,
                                    }) => (
                                        <Animated.View
                                            key={`${key}-${subkey}`}
                                            style={[
                                                styles.subMenuItem,
                                                {
                                                    position: 'relative',
                                                    right: horizontalExpandAnimation,
                                                    width: maxIconSize + 16,
                                                },
                                            ]}>
                                            <Icon
                                                name={iconName}
                                                style={[
                                                    styles.icon,
                                                    {
                                                        // position: 'absolute',
                                                        fontSize,
                                                        width: iconSize,
                                                        borderRadius:
                                                            iconSize / 2,
                                                        backgroundColor: color,
                                                    },
                                                ]}
                                                onPress={onPress}
                                            />
                                        </Animated.View>
                                    )
                                )}
                            </View>
                        )}
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
                            onPress={e => {
                                onPress(e);
                                console.log(key);
                                setExpandedMenuItemKey(key);
                                setSubMenuToggled(!subMenuToggled);
                            }}
                        />
                    </Animated.View>
                )
            )}

            <Icon
                name={menuToggled ? 'arrow-collapse-down' : 'arrow-expand-up'}
                style={[
                    styles.icon,
                    {
                        fontSize,
                        width: iconSize,
                        borderRadius: iconSize / 2,
                        backgroundColor: color,
                    },
                ]}
                onPress={() => setMenuToggled(!menuToggled)}
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
        paddingTop: 1,
        paddingBottom: 1,
        borderWidth: 1,
        zIndex: 99,
    },
    menuItem: {
        backgroundColor: 'rgba(0,0,0,0)',
    },
    subMenu: {
        backgroundColor: 'rgba(0,0,0,0)',
        right: 0,
        position: 'absolute',
        borderWidth: 1,
    },
    subMenuItem: {
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
