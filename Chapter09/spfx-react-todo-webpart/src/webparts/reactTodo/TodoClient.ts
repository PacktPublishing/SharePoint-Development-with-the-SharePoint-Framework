import { ITodoItem } from "./ITodoItem";

export default class TodoClient {
private _todoItems: ITodoItem[] = [
    { Id: 1, Title: "Todo item 1", Done: true },
    { Id: 2, Title: "Todo item 2", Done: false },
    { Id: 3, Title: "Todo item 3", Done: false },
];

private _lastItemId: number = 3;
public getItems(): Promise<ITodoItem[]> {
        return new Promise<ITodoItem[]>((resolve) => {
        resolve(this._todoItems);
    });
}

public add(NewItemTitle: string, NewItemDone: boolean): Promise<number> {
    this._lastItemId += 1;
    this._todoItems.push({
        Id: this._lastItemId,
        Title: NewItemTitle,
        Done: NewItemDone
    });
    return new Promise<number>((resolve) => { resolve(this._lastItemId); });
}

public edit(TodoItem: ITodoItem): Promise<boolean> {
    this._todoItems.forEach((existingItem: ITodoItem) => {
        if (existingItem.Id === TodoItem.Id) {
            existingItem.Title = TodoItem.Title;
            existingItem.Done = TodoItem.Done;
            return new Promise<boolean>((resolve) => { resolve(true); });
        }
    });
    return new Promise<boolean>((resolve) => { resolve(false); });
}

public get(ItemId: number): Promise<ITodoItem> {
    this._todoItems.forEach((existingItem: ITodoItem) => {
        if (existingItem.Id === ItemId) {
            return new Promise<ITodoItem>((resolve) => {
                resolve(existingItem);
            });
        }
    });
    return new Promise<ITodoItem>((resolve) => { resolve(null); });
}

public delete(ItemId: number): Promise<boolean> {
    this._todoItems.forEach((existingItem: ITodoItem) => {
        if (existingItem.Id === ItemId) {
            const ind: number = this._todoItems.indexOf(existingItem);
            this._todoItems.splice(ind,1);
            return new Promise<boolean>((resolve) => { resolve(true); });
        }
    });
    return new Promise<boolean>((resolve) => { resolve(false); });
}
}