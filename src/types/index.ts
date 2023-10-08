import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

// tabs
type TabsParamList = {
    'tab-profile': { username: string };
    'tab-home': undefined;
};

type ProfileTabProps = BottomTabScreenProps<TabsParamList, 'tab-profile'>;
type HomeTabProps = BottomTabScreenProps<TabsParamList, 'tab-home'>;

// home tab stacks
type HomeStackParamList = {
    home: undefined;
    demo: undefined;
};
type HomeScreenProps = NativeStackScreenProps<HomeStackParamList, 'home'>;
type DemoScreenProps = NativeStackScreenProps<HomeStackParamList, 'demo'>;

// profile tab stacks
type ProfileStackParamList = {
    profile: { username: string };
};
type ProfileScreenProps = NativeStackScreenProps<
    ProfileStackParamList,
    'profile'
>;

export type {
    TabsParamList,
    HomeTabProps,
    ProfileTabProps,
    HomeStackParamList,
    HomeScreenProps,
    DemoScreenProps,
    ProfileStackParamList,
    ProfileScreenProps,
};
