/**
 * the entity interface of Todo
 */
export interface Todo {
    id: string;
    title: string;
    completed: boolean;
}

/**
 * the entity interface of agenda
 */
export interface AgendaEvent {
    id: string;
    title: string;
    startDate: string; //for sorting
    startTimestamp: number;
    endTimestamp: number;
    content: string;
    completed: boolean;
    memo: boolean;
    batchId?: string; // mark a batch of agenda, so it can be delete or update simultaneously
}
