import * as React from "react";
import uuid from "react-uuid";

import { /*getItemClassName, getChildrenClassName,*/ getItemById, getClasses, hasChildren, getLevel, removeItem } from "../models";
import AddButton from "./AddButton";
import { useItemsStore } from "store/ItemsStore";
import RemoveButton from "./RemoveButton";

interface Props {
    id: string;
}
export const ItemComponent = (props: Props) => {
    const { id } = props;
    const items = useItemsStore.use.items();
    const update = useItemsStore.use.update();

    const item = getItemById(items, id);
    const level = item ? getLevel(items, item) : undefined;
    const handleRemove = React.useCallback(() => {
        const updatedItems = [...removeItem(items, item)];
        update(updatedItems);
    }, [items, item, update]);

    if (!item) return null;

    return (
        <div className={getClasses(item, level).item}>
            <span className={getClasses(item, level).relation}></span>
            <div className={getClasses(item, level).text}>
                {item.content}
                {!item.isRoot && <RemoveButton handleClick={handleRemove} />}
            </div>
            {hasChildren(item) && (
                <div className={getClasses(item, level).children}>
                    {item.children?.map(id => {
                        return <ItemComponent key={uuid()} id={id} />;
                    })}
                </div>
            )}
            {/* {item.hasChildren && !item.isRoot && <br />} */}
            {item.hasChildren && <AddButton item={item} />}
        </div>
    );
};

export default ItemComponent;
