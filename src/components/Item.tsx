import * as React from "react";
import uuid from "react-uuid";

import AddButton from "./AddButton";
import RemoveButton from "./RemoveButton";

import { ItemsClass, useTestItemsStore } from "store/TestItemsStore";

interface Props {
    id: string;
}
export const ItemComponent = (props: Props) => {
    const { id } = props;
    const { testItems: items, updateTestItems } = useTestItemsStore();
    const item = items.getItemByID(id);
    const classes = items.getClasses(item);
    const handleRemove = React.useCallback(() => {
        if (item) {
            const newItems = items.removeItem(item);
            updateTestItems(newItems);
        }
    }, [items, item, updateTestItems]);

    if (!item || !classes) return null;

    return (
        <div className={classes.item}>
            <span className={classes.relation}></span>
            <div className={classes.text}>
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
