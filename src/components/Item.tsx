import * as React from "react";
import uuid from "react-uuid";

import { AddButton, RemoveButton } from "components";

import { useItemsStore } from "store/ItemsStore";

interface Props {
    id: string;
}
export const ItemComponent = (props: Props) => {
    const { id } = props;
    const { items, updateItems } = useItemsStore();
    const item = items.getItemByID(id);
    const classes = items.getClasses(item);

    const handleRemove = React.useCallback(() => {
        if (item) {
            const newItems = items.removeItem(item);
            updateItems(newItems);
        }
    }, [items, item, updateItems]);

    if (!item || !classes) return null;

    return (
        <div className={classes.item}>
            <span className={classes.relation} data-dynamic={item.relation}></span>
            <div className={classes.heading}>
                {item.content}
                {!item.isRoot && <RemoveButton handleClick={handleRemove} />}
            </div>
            {items.hasChildren(item) && (
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
