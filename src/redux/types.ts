export type itemsType = Array<string | Array<string>>;

export interface InputStore {
    activeScope: string[],
    isInputActive: boolean,
}

// export interface ItemsStore{
//     items: Array<string | Array<string>>
// }

export interface ItemsStore{
    items: itemsType
}

export interface StoreType{
    items: ItemsStore,
    input: InputStore
}