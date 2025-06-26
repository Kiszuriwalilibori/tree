import * as React from "react";
import uuid from "react-uuid";

import { AddButton, RemoveButton } from "components";

import { useItemsStore } from "store/ItemsStore";
import useMessage from "hooks/useMessage";

interface Props {
    id: string;
}
export const ItemComponent = (props: Props) => {
    const { id } = props;
    const { items, updateItems } = useItemsStore();
    const showMessage = useMessage();
    const item = items.getItemByID(id);
    const classes = item ? items.getClasses(item) : undefined;

    const handleRemove = React.useCallback(() => {
        if (item) {
            const newItems = items.removeItem(item);
            updateItems(newItems);
        }
    }, [items, item, updateItems]);

    if (!classes) {
        showMessage.warning(`Classes for item "${id}" could not be generated`);
        return null;
    }
    if (!item) {
        showMessage.warning(`Item with id "${id}" not found`);
        return null;
    }

    return (
        <div className={classes.item}>
            <span className={classes.relation} data-dynamic={item.relation}></span>
            <div className={classes.heading}>
                {item.content}
                {!item.isRoot && <RemoveButton handleClick={handleRemove} />}
            </div>
            {items.hasChildren(item) && (
                <div className={classes.children}>
                    {item.children?.map(childID => {
                        return <ItemComponent key={childID} id={childID} />;
                    })}
                </div>
            )}
            {item.hasChildren && <AddButton item={item} />}
        </div>
    );
};

export default ItemComponent;
