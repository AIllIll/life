import React from 'react';
import type { ProfileStackParamList, ProfileTabProps } from '../types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from '../screens/profile-screen';

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
