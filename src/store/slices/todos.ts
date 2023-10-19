import {
    createAsyncThunk,
    createEntityAdapter,
    createSelector,
    createSlice,
    nanoid,
} from '@reduxjs/toolkit';
import { AsyncStorageKeys, loadStorage, saveStorage } from '@src/storage/local';
import { Todo } from '@src/types/entities';

import { RootState } from '../';

import type { EntityState, PayloadAction } from '@reduxjs/toolkit';

/**
 * the interface of TodosState
 */
export interface TodosState extends EntityState<Todo> {
    status: string;
}

/**
 * Adapter
 */
const todosAdapter = createEntityAdapter<Todo>({
    selectId: todo => todo.id,
    sortComparer: (a, b) => a.title.localeCompare(b.title),
});

/**
 * Slice
 */
const todosSlice = createSlice({
    name: 'todos',
    initialState: todosAdapter.getInitialState({
        status: 'idle',
    }),
    reducers: {
        todoAdded: {
            reducer: (state: TodosState, action: PayloadAction<Todo>) => {
                // ✅ This "mutating" code is okay inside of createSlice!
                const todo = action.payload;
                console.log('todo', todo);
                todosAdapter.addOne(state, todo);
                return state;
            },
            prepare: (title: string) => {
                return {
                    payload: {
                        id: nanoid(),
                        title: title,
                        completed: false,
                    },
                };
            },
        },
        todoToggled(state: TodosState, action: PayloadAction<string>) {
            const todoId = action.payload;
            const todo = state.entities[todoId];
            todo && (todo.completed = !todo.completed);
        },
        todosLoading(state, _) {
            return {
                ...state,
                status: 'loading',
            };
        },
        todoDeleted(state, action: PayloadAction<string>) {
            todosAdapter.removeOne(state, action.payload);
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchTodos.pending, (state, _) => {
                state.status = 'loading';
            })
            .addCase(
                fetchTodos.fulfilled,
                (state, action: PayloadAction<Todo[]>) => {
                    todosAdapter.setAll(state, action.payload);
                    state.status = 'idle';
                }
            )
            .addCase(saveTodos.pending, (state, _) => {
                console.log('saveTodos.pending');
                state.status = 'uploading';
            })
            .addCase(saveTodos.fulfilled, (state, _) => {
                console.log('saveTodos.fulfilled');
                state.status = 'idle';
            });
        // .addCase(saveTodos.rejected, (state, _) => {
        //     console.log('saveTodos.rejected', _);
        //     state.status = 'idle';
        // });
    },
});

/**
 * Thunks Actions
 */
export const fetchTodos = createAsyncThunk(
    'todos/fetchTodos',
    async (): Promise<Todo[]> => {
        // replace with your own async data fetching code
        const response = await loadStorage([AsyncStorageKeys.TEST, 'todos']);
        return response || [];
    }
);

export const saveTodos = createAsyncThunk(
    'todos/saveNewTodo',
    async (todosToSave: Todo[]) => {
        console.log('todosToSave', todosToSave);
        return await saveStorage([AsyncStorageKeys.TEST, 'todos'], todosToSave);
    }
);

/**
 * Redux Actions
 */
export const { todoAdded, todoDeleted, todoToggled, todosLoading } =
    todosSlice.actions;

/**
 * Reducer
 */
export const todosReducer = todosSlice.reducer;

/**
 * Selectors
 * 
 * adapter自带的两个selector
 * 一共有五个：
 * export interface EntitySelectors<T, V> {
    selectIds: (state: V) => EntityId[];
    selectEntities: (state: V) => Dictionary<T>;
    selectAll: (state: V) => T[];
    selectTotal: (state: V) => number;
    selectById: (state: V, id: EntityId) => T | undefined;
}
 * 已经覆盖了所有场景 
 */
export const { selectAll: selectTodos, selectById: selectTodoById } =
    todosAdapter.getSelectors((state: RootState) => state.todos);

/**
 * 在默认selector的基础上定义自己的selector
 */
export const selectTodoIds = createSelector(
    // First, pass one or more "input selector" functions:
    selectTodos,
    // Then, an "output selector" that receives all the input results as arguments
    // and returns a final result value
    todos => todos.map(todo => todo.id)
);
/**
 * using an argument
 */
export const selectTodoByArgs = createSelector(
    [selectTodos, (_, args) => args],
    (items, args) => items.filter(item => item.id == args)
);
