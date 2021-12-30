export type itemsType = Array<string | Array<string>> | null;
export type itemType = string | string[];
export interface InputStore {
    activeScope: string[];
    isInputActive: boolean;
}

export interface ItemsStore {
    items: itemsType;
}

export interface StoreType {
    items: ItemsStore;
    input: InputStore;
}

export const Items = {
    VERY_FIRST_ITEM: 'People',
};
