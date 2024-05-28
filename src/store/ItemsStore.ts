import { INITIAL_ITEMS } from "config";
import { ROOT_ID } from "config";
import { Classes, ID, Item, Items } from "types";
import { create } from "zustand";
export class ItemsClass {
    items: Items;

    constructor(items: Items) {
        this.items = items;
    }
    #isIdUnique(id: ID): boolean {
        const result = this.items.some(item => item.id === id);
        return result === false ? true : false;
    }

    #createID() {
        let test = false;
        let newID: ID;
        do {
            newID = Math.random().toString(36).slice(2);
            const isUnique = this.#isIdUnique(newID);
            test = isUnique;
        } while (test === false);
        return newID;
    }

    #findParentIndex(parent: ID) {
        const index = this.items.findIndex(item => item.id === parent);
        return index;
    }
    #getParent(items: Items, parent: ID) {
        const index = this.#findParentIndex(parent);
        return items[index];
    }
    #getItemLevel(item: Item) {
        if (!item) return undefined;
        let level: number = 0;
        if (item.parent === null) {
            return level;
        } else {
            let ancestor = item;
            do {
                ancestor = this.#getParent(this.items, ancestor.parent);
                level = level + 1;
            } while (ancestor.id !== ROOT_ID);
            return level;
        }
    }
    hasChildren(item) {
        return item.children && item.children.length ? true : false;
    }

    get allItems() {
        return this.items;
    }
    getItemByID(id: ID): Item {
        const result = this.items.find(item => item.id === id);
        return result;
    }
    removeItem(item: Item) {
        const parentIndex = item.parent ? this.#findParentIndex(item.parent) : undefined;
        const childIndex = parentIndex ? this.items[parentIndex].children?.indexOf(item.id) : undefined;
        parentIndex && childIndex && this.hasChildren(this.items[parentIndex]) && this.items[parentIndex].children?.indexOf(item.id) && this.items[parentIndex].children?.splice(childIndex, 1);
        this.items = this.items.filter(element => element.id !== item.id);

        return this;
        // wypadaloby jeszcze usuwać nody które straciły rodzica. najprościej przefiltrować po tym, czy rodzicc, którego mają wpisanego istnieje
    }
    addItem(newItem: Item) {
        this.items.push(newItem);
        const parentIndex = this.items.findIndex(item => item.id === newItem.parent);

        if (this.items[parentIndex].children) {
            this.items[parentIndex].children.push(newItem.id);
        } else {
            this.items[parentIndex].children = [newItem.id];
        }
        return this;
    }
    isItemNotYetDefined(content: string) {
        const result = this.items.findIndex(item => item.content === content);
        return result === -1 ? true : false;
    }
    createItem(parent: ID, content: string, hasChildren: boolean) {
        const id = this.#createID();

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
    getClasses(item) {
        const longLevel = this.#getItemLevel(item);
        const level = longLevel % 10;

        if (!item) return undefined;
        const classes: Classes = {} as Classes;
        if (item.isRoot) {
            classes.item = "Item Item_root";
            classes.children = "Children_root";
            classes.addButton = "Button Button_large";
            classes.heading = "Item_root__heading";
            classes.relation = "Item-root--distancing-span";
        } else {
            classes.item = "Item Item_lower-level Item_level-" + level;
            classes.children = "Children_not-root";
            classes.addButton = "Button Button_small";
            classes.heading = "Item__heading";
            classes.relation = level === 1 ? "relation-distancing-span_top-level" : "relation-distancing-span_lower-level";
        }

        return classes;
    }
}

interface State {
    items: ItemsClass;
    updateItems: (updatedItems: ItemsClass) => void;
}

export const useItemsStore = create<State>(set => ({
    items: new ItemsClass(INITIAL_ITEMS),
    updateItems: (updatedItems: ItemsClass) => {
        set(() => ({ items: updatedItems }));
    },
}));
