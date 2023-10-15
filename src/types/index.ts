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

// home tab drawers
type HomeDrawerParamList = {
    'react-native-calendar': undefined;
    'week-calendar': undefined;
    home: undefined;
    demo: undefined;
    'background-timer': undefined;
    drawer: undefined;
    alert: undefined;
    notification: undefined;
    'local-storage': undefined;
};

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
    HomeDrawerParamList,
    // Plan
    PlanStackParamList,
    PlanScreenProps,
    // Profile
    ProfileStackParamList,
    ProfileScreenProps,
    // common
};
