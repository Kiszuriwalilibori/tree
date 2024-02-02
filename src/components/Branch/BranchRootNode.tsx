import useDebouncedCallback from "../../hooks/useDebouncedCallback";
import BranchHeader from "./BranchHeader";
import DeleteItemButton from "../DeleteItemButton";
import useItems from "../../store/items.store";

interface Props {
    nodeData: string;
}

export const BranchRootNode = (props: Props) => {
    const { nodeData } = props;
    const { removeItem } = useItems();
    const handleClick = useDebouncedCallback<HTMLButtonElement>(removeItem, [undefined, nodeData]);

    return (
        <div className="node">
            <BranchHeader text={nodeData} />
            <DeleteItemButton nodeText={nodeData} handleClick={handleClick} />
        </div>
    );
};
export default BranchRootNode;
