import { Items } from "../../types";
import AppendItemButton from "../AppendItemButton";
import TextItem from "../common/TextItem";
import enhanced from "../../HOCs/enhanced";
import MainTreeNodeFactory from "../common/MainTreeNodeFactory";

const MainTreeRootNode = enhanced(TextItem, "top-header");

const MainTreeRegularNodeFactory = enhanced(
    MainTreeNodeFactory,
    "wrapper-primary",
    "wrapper-primary-outer",
    "distancer"
);

interface Props {
    ary: Items;
    header: string;
}

const MainTree = (props: Props) => {
    const { ary, header } = props;

    return ary ? (
        <>
            <MainTreeRootNode str={header} />
            <div className={"contentWrapperPrimary"}>
                {ary.map(item => (
                    <MainTreeRegularNodeFactory key={item} itemOrItemsArray={item} header={header} />
                ))}
                <AppendItemButton str={header} primary={true} />
            </div>
        </>
    ) : null;
};

export default MainTree;
