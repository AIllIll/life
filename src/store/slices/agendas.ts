import {
    createAsyncThunk,
    createEntityAdapter,
    createSelector,
    createSlice,
    EntityState,
    nanoid,
    PayloadAction,
} from '@reduxjs/toolkit';
import {
    AsyncStorageKeys,
    CONST_STORAGE_KEYS,
    loadStorage,
    saveStorage,
} from '@src/storage/local';

import { RootState } from '../';
import { isPendingAction, isRejectedAction } from './';

import type { AgendaEvent } from '@src/types/entities';
/**
 * the interface of AgendasState
 */
export interface AgendasState extends EntityState<AgendaEvent> {
    status: string; // network status
}

/**
 * Adapter
 */
const adapter = createEntityAdapter<AgendaEvent>({
    selectId: agenda => agenda.id,
    sortComparer: (a, b) => a.startTimestamp - b.startTimestamp,
});

/**
 * Slice
 */
const agendasSlice = createSlice({
    name: 'agendas',
    initialState: adapter.getInitialState({
        status: 'idle',
    }),
    reducers: {},
    extraReducers: builder => {
        builder
            // fetch
            .addCase(
                fetchAll.fulfilled,
                (state, action: PayloadAction<AgendaEvent[]>) => {
                    adapter.setAll(state, action.payload);
                    state.status = 'idle';
                }
            )
            // create
            .addCase(
                createOne.fulfilled,
                (state, action: PayloadAction<AgendaEvent>) => {
                    adapter.addOne(state, action.payload);
                    state.status = 'idle';
                }
            )
            // delete
            .addCase(
                deleteOne.fulfilled,
                (state, action: PayloadAction<AgendaEvent>) => {
                    adapter.removeOne(state, action.payload.id);
                    state.status = 'idle';
                }
            )
            // update
            // use delete and create instead until remote server storage is involved
            // .addCase(
            //     updateOne.fulfilled,
            //     (state, action: PayloadAction<Agenda>) => {
            //         adapter.updateOne(state, {
            //             id: action.payload.id,
            //             changes: action.payload,
            //         });
            //         state.status = 'idle';
            //     }
            // )
            // 所有pending
            .addMatcher(isPendingAction, (state, _) => {
                state.status = 'pending';
            })
            // 所有rejected
            .addMatcher(isRejectedAction, (state, action) => {
                state.status = 'rejected';
                console.error(action.error);
            });
    },
});

/**
 * Thunks Actions
 */
export const fetchAll = createAsyncThunk(
    'agendas/fetchAll',
    async (): Promise<AgendaEvent[]> => {
        // read storage of dates that have agenda
        const datesWithAgenda = await loadStorage(
            CONST_STORAGE_KEYS.AGENDA_DATES
        );
        // read storage of agenda by date
        let agendas: AgendaEvent[] = [];
        for (const date of datesWithAgenda) {
            const agendasOfOneDate = await loadStorage([
                AsyncStorageKeys.AGENDA,
                date,
            ]);
            agendas = agendas.concat(agendasOfOneDate);
        }
        return agendas;
    }
);

export const createOne = createAsyncThunk(
    'agendas/createOne',
    async (one: AgendaEvent) => {
        one.id = nanoid();
        const date = one.startDate;
        const agendasOfOneDate =
            (await loadStorage([AsyncStorageKeys.AGENDA, date])) || [];
        agendasOfOneDate.push(one);
        await saveStorage([AsyncStorageKeys.AGENDA, date], agendasOfOneDate);
        // if it is the first agenda in agendasOfOneDate, the date should be added to datesWithAgenda
        if (agendasOfOneDate.length == 1) {
            const datesWithAgenda = await loadStorage(
                CONST_STORAGE_KEYS.AGENDA_DATES
            );
            datesWithAgenda.push(date);
            await saveStorage(CONST_STORAGE_KEYS.AGENDA_DATES, datesWithAgenda);
        }
        return one;
    }
);

export const deleteOne = createAsyncThunk(
    'agendas/deleteOne',
    async (one: AgendaEvent) => {
        const date = one.startDate;
        let agendasOfOneDate =
            (await loadStorage([AsyncStorageKeys.AGENDA, date])) || [];
        agendasOfOneDate = agendasOfOneDate.filter(
            (agenda: AgendaEvent) => agenda.id != one.id
        );
        await saveStorage([AsyncStorageKeys.AGENDA, date], agendasOfOneDate);
        // if agendasOfOneDate becomes empty, the date should be removed from datesWithAgenda
        if (agendasOfOneDate.length == 0) {
            let datesWithAgenda = await loadStorage(
                CONST_STORAGE_KEYS.AGENDA_DATES
            );
            datesWithAgenda = datesWithAgenda.filter((d: string) => date == d);
            await saveStorage(CONST_STORAGE_KEYS.AGENDA_DATES, datesWithAgenda);
        }
        return one;
    }
);

// export const updateOne = createAsyncThunk(
//     'agendas/updateOne',
//     async (item: Agenda) => {
//         item.id = nanoid();
//         const date = item.startDate;
//         const agendasOfOneDate =
//             (await loadStorage([AsyncStorageKeys.AGENDA, date])) || [];
//         agendasOfOneDate.push(item);
//         await saveStorage([AsyncStorageKeys.AGENDA, date], agendasOfOneDate);
//         // todo: if agendasOfOneDate becomes empty, the date should be removed from datesWithAgenda
//         return item;
//     }
// );

/**
 * Redux Actions
 */

/**
 * Reducer
 */
export const agendasReducer = agendasSlice.reducer;

/**
 * Selectors
 */
export const { selectAll: selectAgendas, selectById: selectAgendaById } =
    adapter.getSelectors((state: RootState) => state.agendas);
export const selectAgendaDates = createSelector(selectAgendas, items =>
    items.map(item => item.startDate)
);
export const selectAgendaByDate = createSelector(
    [selectAgendas, (_, date) => date],
    (items, date) => items.filter(item => item.startDate == date)
);
