import BranchNode from "../Branch";
import BasicNode from "./BasicNode";
import { Item } from "../../types";

interface Props {
    nodeContent: Item;
    header: string | undefined;
}
/**
 * renders node of scheme which could be single criterium field or subtree of fields, depending of props.
 * @param header header prop is not read here but passed to Delete component which removes field
 * @param itemOrItemsArray defines whether it returns single field(string) or subtree(array of strings) and keeps its content
 * @returns component
 */
const MainTreeNodeFactory = (props: Props): JSX.Element => {
    const { nodeContent, header } = props;

    if (typeof nodeContent === "string") {
        return <BasicNode nodeTextContent={nodeContent} header={header} />;
    }

    if (nodeContent && Array.isArray(nodeContent)) {
        return <BranchNode branchNodesData={nodeContent} />;
    }
};
export default MainTreeNodeFactory;
