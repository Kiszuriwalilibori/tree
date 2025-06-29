import { ROOT_ID } from "config";
import { Classes, ID, Item, Items } from "types";

export class ItemsClass {
    items: Items;

    constructor(items: Items) {
        this.items = items;
    }
    #isIdUnique(id: ID): boolean {
        const result = this.items.some(item => item.id === id);
        return result === false ? true : false;
    }

    #createID(): ID {
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
    #getParent(items: Items, parent: ID): Item {
        const index = this.#findParentIndex(parent);
        return items[index];
    }

    #getItemLevel(item: Item): number | undefined {
        if (!item) return undefined;
        let level: number = 0;
        if (item.parent === null) {
            return level;
        } else {
            let ancestor = item;
            do {
                ancestor = this.#getParent(this.items, ancestor.parent!);
                level = level + 1;
            } while (ancestor.id !== ROOT_ID);
            return level;
        }
    }
    hasChildren(item: Item): boolean {
        return Boolean(item.children && item.children.length > 0);
    }

    get allItems(): Items {
        return this.items;
    }
    getItemByID(id: ID): Item | undefined {
        const result = this.items.find(item => item.id === id);
        return result;
    }

    removeItem(item: Item): ItemsClass {
        const getAllDescendantIds = (itemId: ID): ID[] => {
            const descendants: ID[] = [];
            const currentItem = this.getItemByID(itemId);

            if (currentItem && currentItem.children) {
                for (const childId of currentItem.children) {
                    descendants.push(childId);

                    descendants.push(...getAllDescendantIds(childId));
                }
            }

            return descendants;
        };

        const idsToRemove = new Set([item.id, ...getAllDescendantIds(item.id)]);

        if (item.parent) {
            const parentIndex = this.#findParentIndex(item.parent);
            if (parentIndex !== -1 && this.items[parentIndex].children) {
                const childIndex = this.items[parentIndex].children!.indexOf(item.id);
                if (childIndex !== -1) {
                    this.items[parentIndex].children!.splice(childIndex, 1);
                }
            }
        }

        this.items = this.items.filter(element => !idsToRemove.has(element.id));

        return this;
    }
    addItem(newItem: Item): ItemsClass {
        this.items.push(newItem);
        const parentIndex = this.items.findIndex(item => item.id === newItem.parent);

        if (this.items[parentIndex].children) {
            this.items[parentIndex].children!.push(newItem.id);
        } else {
            this.items[parentIndex].children = [newItem.id];
        }
        return this;
    }
    isItemNotYetDefined(content: string): boolean {
        const result = this.items.findIndex(item => item.content === content);
        return result === -1 ? true : false;
    }
    createItem(parent: ID, content: string, hasChildren: boolean, relation: string): Item {
        const id = this.#createID();

        const item: Item = {
            children: undefined,
            content,
            hasChildren,
            id,
            isRoot: false,
            parent,
            relation,
        };
        return item;
    }
    getClasses(item: Item): Classes | undefined {
        const longLevel = this.#getItemLevel(item);
        if (longLevel === undefined) return undefined;
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
            classes.item = `Item Item_lower-level Item_level-${level}`;
            classes.children = "Children_not-root";
            classes.addButton = "Button Button_small";
            classes.heading = "Item__heading";
            classes.relation = level === 1 ? "relation-distancing-span_top-level" : "relation-distancing-span_lower-level";
        }

        return classes;
    }
}

export default ItemsClass;
