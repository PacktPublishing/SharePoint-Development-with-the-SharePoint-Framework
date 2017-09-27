import {ITodoItem} from "../ITodoItem";
export interface IReactTodoState {
    todoItems?: ITodoItem[];
    showNewTodoPanel?: boolean;
    newItemTitle?: string;
    newItemDone?: boolean;
}