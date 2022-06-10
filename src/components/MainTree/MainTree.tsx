import { itemsType } from '../../types';
import AppendItemButton from '../AppendItemButton';
import TextItem from '../common/TextItem';
import Enhanced from '../../HOCs/enhanced';
import MainTreeNodeFactory from '../common/MainTreeNodeFactory';

const MainTreeRootNode = Enhanced(TextItem, 'top-header');

const MainTreeRegularNodeFactory = Enhanced(
    MainTreeNodeFactory,
    'wrapper-primary',
    'wrapper-primary-outer',
    'distancer',
);

interface treePropsType {
    ary: itemsType;
    header: string;
}

const MainTree = (props: treePropsType) => {
    const { ary, header } = props;

    return ary ? (
        <>
            <MainTreeRootNode str={header} />
            <div className={'contentWrapperPrimary'}>
                {ary.map(item => (
                    <MainTreeRegularNodeFactory key={item} itemOrItemsArray={item} header={header} />
                ))}
                <AppendItemButton str={header} primary={true} />
            </div>
        </>
    ) : null;
};

export default MainTree;
