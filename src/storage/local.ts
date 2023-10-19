import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * all keys must start with one of AsyncStorageKeys
 * a secondary key is optional
 * the final key of AsyncStorage is of a pattern `${MainKey}${KEY_CONNECTOR}${SecondaryKey}`
 */
export enum AsyncStorageKeys {
    TEST = 'test',
    // for real
    AGENDA = 'agenda',
}

/**
 * the constant keys
 */
export const CONST_STORAGE_KEYS: { [key: string]: [AsyncStorageKeys, string] } =
    {
        AGENDA_DATES: [AsyncStorageKeys.AGENDA, 'dates'],
    };

const KEY_CONNECTOR = '/';

export type AgendaCacheKey = string;

export const getAgendaStorageKey = (date: string): AgendaCacheKey => {
    return `agenda-${date}`;
};

export const loadStorage = async (
    key: [AsyncStorageKeys, string] | [AsyncStorageKeys],
    callback?: (res: string | null | undefined) => void
): Promise<any> => {
    const finalKey = `${key[0]}${KEY_CONNECTOR}${key[1] || ''}`;
    const item = await AsyncStorage.getItem(finalKey, (err, res) => {
        if (err) {
            throw err;
        } else {
            callback && callback(res && JSON.parse(res));
        }
    });
    return item && JSON.parse(item);
};

export const saveStorage = async (
    key: [AsyncStorageKeys, string] | [AsyncStorageKeys],
    item: any,
    callback?: () => void
): Promise<void> => {
    const finalKey = `${key[0]}${KEY_CONNECTOR}${key[1] || ''}`;
    try {
        return await AsyncStorage.setItem(
            finalKey,
            JSON.stringify(item),
            err => {
                if (err) {
                    throw err;
                } else {
                    callback && callback();
                }
            }
        );
    } catch (e) {
        console.error(e);
    }
};
