import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from '@src/screens/profile-screen';

import type { ProfileStackParamList, ProfileTabProps } from '@src/types';
const ProfileStack = createNativeStackNavigator<ProfileStackParamList>();

const ProfileTab = ({ navigation, route }: ProfileTabProps): JSX.Element => {
    return (
        <ProfileStack.Navigator>
            <ProfileStack.Screen
                name="profile"
                component={ProfileScreen}
                initialParams={{ username: route.params.username }}
            />
        </ProfileStack.Navigator>
    );
};
export default ProfileTab;
