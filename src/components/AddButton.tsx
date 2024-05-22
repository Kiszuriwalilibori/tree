import { getClasses } from "models/index";
import { Item } from "types";
import { Plus } from "components";
import { useActiveItemStore, useModalStore } from "store";
import { useCallback } from "react";

interface Props {
    item: Item;
}

export const AddButton = (props: Props) => {
    const { item } = props;

    const classes = getClasses(item);
    const setActiveItem = useActiveItemStore.use.setActiveItem();
    const openModal = useModalStore.use.openModal();

    const handleClick = useCallback(() => {
        setActiveItem(item);
        openModal();
    }, [item, setActiveItem, openModal]);

    return (
        <button className={classes.addButton} onClick={handleClick} aria-label="add-button">
            <div className="cross">
                <Plus />
            </div>
        </button>
    );
};

export default AddButton;
