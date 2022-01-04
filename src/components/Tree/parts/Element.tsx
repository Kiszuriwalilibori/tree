import useDispatchAction from '../../../hooks/useDispatchAction';
import { useDebouncedCallback } from '../../../hooks/createDebouncedCallback';
import { TextItem } from './TextItem';
import DeleteItemButton from '../../DeleteItemButton';
import Tree from '../Tree';

//Element renders node of scheme which could be single criterium field or subtree of fields, depending of props.
//If prop 'string' is string it renders single field, if not it renders subtree
//header prop is not read here but passed to Delete component which removes field

interface elementPropsType {
    itemOrItemsArray: string | string[];
    header: string | undefined;
}
/**
 * renders node of scheme which could be single criterium field or subtree of fields, depending of props.
 * @param header header prop is not read here but passed to Delete component which removes field
 * @param itemOrItemsArray defines whether it returns single field(string) or subtree(array of strings) and keeps its content
 * @returns component
 */
const Element = (props: elementPropsType): JSX.Element => {
    const { itemOrItemsArray, header } = props;
    const { removeItem } = useDispatchAction();
    const handleClick = useDebouncedCallback(removeItem, [header, itemOrItemsArray]);

    if (typeof itemOrItemsArray === 'string') {
        return (
            <div className="element" id={itemOrItemsArray}>
                <TextItem string={itemOrItemsArray} />
                <DeleteItemButton nodeText={itemOrItemsArray} handleClick={handleClick} />
            </div>
        );
    }

    if (Array.isArray(itemOrItemsArray)) {
        return <Tree ary={itemOrItemsArray} primary={false} head={''} />;
    }
};

export default Element;
