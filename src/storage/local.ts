import AsyncStorage from '@react-native-async-storage/async-storage';

// all keys
export enum AsyncStorageKeys {
    TEST = 'test',
    AGENDA = 'agenda',
}

export const loadStorage = async (
    key: AsyncStorageKeys,
    callback?: (res: string | null | undefined) => void
): Promise<string | null> => {
    const item = await AsyncStorage.getItem(key, (err, res) => {
        if (err) {
            throw err;
        } else {
            callback && callback(res && JSON.parse(res));
        }
    });
    return item && JSON.parse(item);
};

export const saveStorage = async (
    key: AsyncStorageKeys,
    item: any,
    callback?: () => void
): Promise<void> => {
    return await AsyncStorage.setItem(key, JSON.stringify(item), err => {
        if (err) {
            throw err;
        } else {
            callback && callback();
        }
    });
};
