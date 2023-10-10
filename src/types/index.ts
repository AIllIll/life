import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

// tabs
type TabsParamList = {
    'profile-tab': { username: string };
    'plan-tab': undefined;
    'home-tab': undefined;
};

type ProfileTabProps = BottomTabScreenProps<TabsParamList, 'profile-tab'>;
type PlanTabProps = BottomTabScreenProps<TabsParamList, 'plan-tab'>;
type HomeTabProps = BottomTabScreenProps<TabsParamList, 'home-tab'>;

// home tab stacks
type HomeStackParamList = {
    home: undefined;
    demo: undefined;
    'background-timer': undefined;
};
type HomeScreenProps = NativeStackScreenProps<HomeStackParamList, 'home'>;
type DemoScreenProps = NativeStackScreenProps<HomeStackParamList, 'demo'>;
type BackgroundTimerScreenProps = NativeStackScreenProps<
    HomeStackParamList,
    'background-timer'
>;

// plan tab stacks
type PlanStackParamList = {
    plan: undefined;
};
type PlanScreenProps = NativeStackScreenProps<PlanStackParamList, 'plan'>;

// profile tab stacks
type ProfileStackParamList = {
    profile: { username: string };
};
type ProfileScreenProps = NativeStackScreenProps<
    ProfileStackParamList,
    'profile'
>;

export type {
    // Tabs
    TabsParamList,
    HomeTabProps,
    PlanTabProps,
    ProfileTabProps,
    // Home
    HomeStackParamList,
    HomeScreenProps,
    DemoScreenProps,
    BackgroundTimerScreenProps,
    // Plan
    PlanStackParamList,
    PlanScreenProps,
    // Profile
    ProfileStackParamList,
    ProfileScreenProps,
};
