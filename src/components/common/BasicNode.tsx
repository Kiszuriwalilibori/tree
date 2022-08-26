import useDebouncedCallback from "../../hooks/useDebouncedCallback";
import useDispatchAction from "../../hooks/useDispatchAction";
import DeleteItemButton from "../DeleteItemButton";
import TextItem from "./TextItem";

interface Props {
    item: string;
    header: string | undefined;
}

const BasicNode = (props: Props) => {
    const { item, header } = props;
    const { removeItem } = useDispatchAction();
    const handleClick = useDebouncedCallback(removeItem, [header, item]);
    return (
        <div className="node" id={item}>
            <TextItem str={item} />
            <DeleteItemButton nodeText={item} handleClick={handleClick} />
        </div>
    );
};

export default BasicNode;
