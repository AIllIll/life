import { AnyAction, AsyncThunk } from '@reduxjs/toolkit';

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;

export type PendingAction = ReturnType<GenericAsyncThunk['pending']>;
export type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>;
export type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>;

export const isPendingAction = (action: AnyAction): action is PendingAction => {
    return action.type.endsWith('/pending');
};

export const isRejectedAction = (
    action: AnyAction
): action is RejectedAction => {
    return action.type.endsWith('/rejected');
};

export const isFulfilledAction = (
    action: AnyAction
): action is FulfilledAction => {
    return action.type.endsWith('/fulfilled');
};
