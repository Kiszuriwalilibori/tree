/*
 TODO brakuje testu czy przekazuje akurat ten callback jako drugi parametr
 */

import useDispatchAction from '../../hooks/useDispatchAction';
import useDebouncedCallback from '../../hooks/useDebouncedCallback';
import SecondaryHeaderText from './SecondaryHeaderText';
import DeleteItemButton from '../DeleteItemButton';

interface branchRootNodePropsType {
    string: string;
}

export const BranchRootNode = (props: branchRootNodePropsType) => {
    const { string } = props;
    const { removeItem } = useDispatchAction();
    const handleClick = useDebouncedCallback(removeItem, [undefined, string]);

    return (
        <div className="element">
            <SecondaryHeaderText str={string} />
            <DeleteItemButton nodeText={string} handleClick={handleClick} />
        </div>
    );
};
export default BranchRootNode;
