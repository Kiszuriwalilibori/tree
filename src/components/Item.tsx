import * as React from "react";
import uuid from "react-uuid";

import AddButton from "./AddButton";
import RemoveButton from "./RemoveButton";
import ItemsManager from "../models";

import { useItemsStore } from "store/ItemsStore";

interface Props {
    id: string;
}
export const ItemComponent = (props: Props) => {
    const { id } = props;
    const items = useItemsStore.use.items();
    const update = useItemsStore.use.updateItemsStore();

    const item = ItemsManager.getItemByID(items, id);

    const classes = ItemsManager.getClasses(items, item);
    const handleRemove = React.useCallback(() => {
        if (item) {
            const updatedItems = [...ItemsManager.removeItem(items, item)];
            update(updatedItems);
        }
    }, [items, item, update]);

    if (!item || !classes) return null;

    return (
        <div className={classes.item}>
            <span className={classes.relation}></span>
            <div className={classes.text}>
                {item.content}
                {!item.isRoot && <RemoveButton handleClick={handleRemove} />}
            </div>
            {ItemsManager.hasChildren(item) && (
                <div className={classes.children}>
                    {item.children?.map(id => {
                        return <ItemComponent key={uuid()} id={id} />;
                    })}
                </div>
            )}
            {item.hasChildren && <AddButton item={item} />}
        </div>
    );
};

export default ItemComponent;
