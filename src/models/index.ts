import { ROOT_ID } from "config";
import { Classes, ID, Item, Items } from "../types";
import { isIdUnique } from "./local";
// const initialContent = "";

function createID(items: Items) {
    let test = false;
    let newID: ID;
    do {
        newID = Math.random().toString(36).slice(2);
        const isUnique = isIdUnique(items, newID);
        test = isUnique;
    } while (test === false);
    return newID;
}

// export function getRootItem(items: Items) {
//     const result = items.find(item => item.isRoot === true);
//     return result;
// }
// export function isItemNotYetDefined(items: Items, content: string) {
//     const result = items.findIndex(item => item.content === content);
//     return result === -1 ? true : false;
// }

export function createItem(items: Items, parent: ID, content: string, hasChildren: boolean) {
    const id = createID(items);

    const item = {
        children: undefined,
        content,
        hasChildren,
        id,
        isRoot: false,
        parent,
    };
    return item;
}

export function update(items: Items, newItem: Item) {
    items.push(newItem);
    const parentIndex = items.findIndex(item => item.id === newItem.parent);

    if (items[parentIndex].children) {
        items[parentIndex].children.push(newItem.id);
    } else {
        items[parentIndex].children = [newItem.id];
    }
    return [...items];
}

export function removeItem(items: Items, item: Item) {
    const parentIndex = item.parent ? findParentIndex(items, item.parent) : undefined;
    const childIndex = parentIndex ? items[parentIndex].children?.indexOf(item.id) : undefined;
    parentIndex && childIndex && hasChildren(items[parentIndex]) && items[parentIndex].children?.indexOf(item.id) && items[parentIndex].children?.splice(childIndex, 1);
    return items.filter(element => element.id !== item.id);
    // wypadaloby jeszcze usuwać nody które straciły rodzica. najprościej przefiltrować po tym, czy rodzicc, którego mają wpisanego sitnieje
}

export function getItemById(items: Items, id: ID) {
    const result = items.find(item => item.id === id);
    return result;
}

export function findParentIndex(items: Items, parent: ID) {
    const index = items.findIndex(item => item.id === parent);
    return index;
}
export function hasChildren(item) {
    return item.children && item.children.length ? true : false;
}

export function getParent(items: Items, parent: ID) {
    const index = findParentIndex(items, parent);
    return items[index];
}

export function getClasses(item, level = 0) {
    const classes: Classes = {} as Classes;
    if (item.isRoot) {
        classes.item = "Item Item-root";
        classes.children = "Children--root";
        classes.addButton = "Button Button--large";
        classes.text = "Item-root-text";
        classes.relation = "Item-root--distancing-span";
    } else {
        classes.item = "Item Item--level-" + level;
        classes.children = "Children--not-root";
        classes.addButton = "Button Button--small";
        classes.text = "Item--text";
        classes.relation = level === 1 ? "relation-distancing-span-level-1" : "relation-distancing-span-lower-level";
    }

    return classes;
}

export default abstract class ItemsManager {
    static getItemByID(items: Items, id: ID): Item {
        const result = items.find(item => item.id === id);
        return result;
    }
    static getItemLevel(items: Items, item: Item) {
        if (!item) return undefined;
        let level: number = 0;
        if (item.parent === null) {
            return level;
        } else {
            let ancestor = item;
            do {
                ancestor = getParent(items, ancestor.parent);
                level = level + 1;
            } while (ancestor.id !== ROOT_ID);
            return level;
        }
    }
    static removeItem(items: Items, item: Item) {
        const parentIndex = item.parent ? findParentIndex(items, item.parent) : undefined;
        const childIndex = parentIndex ? items[parentIndex].children?.indexOf(item.id) : undefined;
        parentIndex && childIndex && hasChildren(items[parentIndex]) && items[parentIndex].children?.indexOf(item.id) && items[parentIndex].children?.splice(childIndex, 1);
        return items.filter(element => element.id !== item.id);
        // wypadaloby jeszcze usuwać nody które straciły rodzica. najprościej przefiltrować po tym, czy rodzicc, którego mają wpisanego sitnieje
    }
    static addItem(items: Items, newItem: Item) {
        items.push(newItem);
        const parentIndex = items.findIndex(item => item.id === newItem.parent);

        if (items[parentIndex].children) {
            items[parentIndex].children.push(newItem.id);
        } else {
            items[parentIndex].children = [newItem.id];
        }
        return [...items];
    }
    static isItemNotYetDefined(items: Items, content: string) {
        const result = items.findIndex(item => item.content === content);
        return result === -1 ? true : false;
    }

    static createItem(items: Items, parent: ID, content: string, hasChildren: boolean) {
        const id = createID(items);

        const item = {
            children: undefined,
            content,
            hasChildren,
            id,
            isRoot: false,
            parent,
        };
        return item;
    }
}