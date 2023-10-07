import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
    Home: { username?: string };
    Demo: undefined;
};

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

type DemoScreenProps = NativeStackScreenProps<RootStackParamList, 'Demo'>;

export type { RootStackParamList, HomeScreenProps, DemoScreenProps };
