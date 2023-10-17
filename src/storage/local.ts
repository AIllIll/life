import AsyncStorage from '@react-native-async-storage/async-storage';

// all keys
export enum AsyncStorageKeys {
    TEST = 'test',
    AGENDA = 'agenda',
    TEST_REDUX = 'test-redux',
}

export const loadStorage = async (
    key: AsyncStorageKeys,
    callback?: (res: string | null | undefined) => void
): Promise<any> => {
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
    try {
        return await AsyncStorage.setItem(key, JSON.stringify(item), err => {
            if (err) {
                throw err;
            } else {
                callback && callback();
            }
        });
    } catch (e) {
        console.error(e);
    }
};
