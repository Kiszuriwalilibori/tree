import { memo } from "react";
import useDebouncedCallback from "../../hooks/useDebouncedCallback";
import useItems from "../../store/items.store";
import DeleteItemButton from "../DeleteItemButton";
import TextItem from "./TextItem";

interface Props {
    nodeTextContent: string;
    header: string | undefined;
}

const BasicNode = (props: Props) => {
    const { nodeTextContent, header } = props;
    const { removeItem } = useItems();
    const handleClick = useDebouncedCallback<HTMLButtonElement>(removeItem, [header, nodeTextContent]);

    return (
        <div className="node" id={nodeTextContent}>
            <TextItem text={nodeTextContent} />
            <DeleteItemButton nodeText={nodeTextContent} handleClick={handleClick} />
        </div>
    );
};

export default memo(BasicNode);
