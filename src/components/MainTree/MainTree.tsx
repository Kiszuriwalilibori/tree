import withEnhancement from "../../HOCs/withEnhancement";
import AppendItemButton from "../AppendItemButton";
import { MainTreeNodeFactory } from "../common";
import { TextItem } from "../common/TextItem";
import { Items } from "../../types";

const TreeTitle = withEnhancement(TextItem, "top-header");

const NodesFactory = withEnhancement(MainTreeNodeFactory, "wrapper-primary", "wrapper-primary-outer", "distancer");

interface Props {
    treeContent: Items;
    header: string;
}

const MainTree = (props: Props) => {
    const { treeContent, header } = props;

    return treeContent ? (
        <>
            <TreeTitle text={header} />
            <div className={"contentWrapperPrimary"}>
                {treeContent.map(item => (
                    <NodesFactory key={item} nodeContent={item} header={header} />
                ))}
                <AppendItemButton str={header} primary={true} />
            </div>
        </>
    ) : null;
};

export default MainTree;
