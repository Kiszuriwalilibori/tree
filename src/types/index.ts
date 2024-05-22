export type ID = string;
export type Content = string;

export interface Item {
    children: ID[] | undefined;
    content: Content;
    hasChildren: boolean;
    id: ID;
    isRoot: boolean;
    parent: ID | null;
}

export type Items = Item[];

export interface Classes {
    text: string;
    addButton: string;
    children: string;
    item: string;
    relation: string;
}
