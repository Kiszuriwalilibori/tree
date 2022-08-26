import Branch from "../Branch";
import BasicNode from "./BasicNode";

interface Props {
    itemOrItemsArray: string | string[];
    header: string | undefined;
}
/**
 * renders node of scheme which could be single criterium field or subtree of fields, depending of props.
 * @param header header prop is not read here but passed to Delete component which removes field
 * @param itemOrItemsArray defines whether it returns single field(string) or subtree(array of strings) and keeps its content
 * @returns component
 */
const MainTreeNodeFactory = (props: Props): JSX.Element => {
    const { itemOrItemsArray, header } = props;

    if (typeof itemOrItemsArray === "string") {
        return <BasicNode item={itemOrItemsArray} header={header} />;
    }

    if (Array.isArray(itemOrItemsArray)) {
        return <Branch ary={itemOrItemsArray} />;
    }
};
export default MainTreeNodeFactory;
