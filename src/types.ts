export type Items = Array<string | Array<string>> | null;
export type Item = string | string[];
export interface InputStore {
    activeScope: string[];
    isInputActive: boolean;
}

export interface ItemsStore {
    items: Items;
}

export interface StoreType {
    items: ItemsStore;
    input: InputStore;
}
