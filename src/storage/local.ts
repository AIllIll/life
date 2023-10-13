import AsyncStorage from '@react-native-async-storage/async-storage';
import { CallbackWithResult } from '@react-native-async-storage/async-storage/lib/typescript/types';

enum AsyncStorageKeys {
    TEST = 'test',
    AGENDA = 'agenda',
}

const loadStorage = async (
    key: AsyncStorageKeys,
    callback?: CallbackWithResult<string>
): Promise<string | null> => {
    const item = await AsyncStorage.getItem(key, callback);
    return item && JSON.parse(item);
};

const saveStorage = async (
    key: AsyncStorageKeys,
    item: any,
    callback?: CallbackWithResult<string>
): Promise<void> => {
    return await AsyncStorage.setItem(key, JSON.stringify(item), callback);
};

export { AsyncStorageKeys, loadStorage, saveStorage };
