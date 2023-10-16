import { PayloadAction, configureStore } from '@reduxjs/toolkit';
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';
import { createSlice } from '@reduxjs/toolkit';

const testsSlice = createSlice({
    name: 'tests',
    initialState: '',
    reducers: {
        setTestValue(state: any, action: PayloadAction<string>) {
            console.log('setTestValue, old state: ', state);
            state = action.payload;
            return state;
        },
    },
});

const agendasSlice = createSlice({
    name: 'agendas',
    initialState: [],
    reducers: {
        agendaAdded(
            state: any,
            action: PayloadAction<{
                date: string;
                title: string;
                description: string;
            }>
        ) {
            state.push({
                date: action.payload.date,
                title: action.payload.title,
                description: action.payload.description,
                completed: false,
            });
        },
    },
});

const store: ToolkitStore = configureStore({
    reducer: {
        agendas: agendasSlice.reducer,
        tests: testsSlice.reducer,
    },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const { agendaAdded } = agendasSlice.actions;
export const { setTestValue } = testsSlice.actions;
