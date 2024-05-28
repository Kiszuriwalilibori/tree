import { Item } from "types";
import { Plus } from "components";
import { useModalStore, useItemsStore } from "store";
import { useCallback } from "react";

interface Props {
    item: Item;
}

export const AddButton = (props: Props) => {
    const { item } = props;
    const { items } = useItemsStore();
    const classes = items.getClasses(item);
    const openModal = useModalStore.use.openModal();

    const handleClick = useCallback(() => {
        openModal(item);
    }, [item, openModal]);

    return (
        <button className={classes.addButton} onClick={handleClick} aria-label="add-button">
            <div className="cross">
                <Plus />
            </div>
        </button>
    );
};

export default AddButton;
