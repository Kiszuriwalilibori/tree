import uuid from "react-uuid";
import AppendItemButton from "../AppendItemButton";
import BranchRootNode from "./BranchRootNode";
import EnhancedNode from "./EnhancedNode";

interface Props {
    branchNodesData: string[];
}

export const Branch = (props: Props) => {
    const { branchNodesData } = props;
    const header = branchNodesData.shift();
    if (!header) return null;
    return (
        <>
            <BranchRootNode nodeData={header} />
            <div className={"contentWrapperSecondary"}>
                {branchNodesData.map(item => (
                    <EnhancedNode key={uuid()} nodeTextContent={item} header={header} />
                ))}
                <AppendItemButton str={header} primary={false} />
            </div>
        </>
    );
};

export default Branch;
