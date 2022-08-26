import AppendItemButton from "../AppendItemButton";
import BranchRootNode from "./BranchRootNode";
import EnhancedElement from "./EnhancedElement";

interface Props {
    ary: string[];
}

export const Branch = (props: Props) => {
    const { ary } = props;
    const header = ary.shift() as string;

    return ary ? (
        <>
            <BranchRootNode string={header} />
            <div className={"contentWrapperSecondary"}>
                {ary.map(item => (
                    <EnhancedElement key={item} item={item} header={header} />
                ))}
                <AppendItemButton str={header} primary={false} />
            </div>
        </>
    ) : null;
};

export default Branch;
