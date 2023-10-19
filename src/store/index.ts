import { configureStore } from '@reduxjs/toolkit';

import { agendasReducer } from './slices/agendas';
import { todosReducer } from './slices/todos';

const store = configureStore({
    reducer: {
        todos: todosReducer,
        agendas: agendasReducer,
    },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
