//Header mógłby być funkcją przyjmującą dwa propsy i zwracającą komponent a nie obiekt

import React from 'react';
import DeleteItemButton from '../DeleteItemButton';
import PropTypes from 'prop-types';
import { itemsType } from '../../types';
import AppendItemButton from '../AppendItemButton';
import useDispatchAction from '../../hooks/useDispatchAction';
import { useDebouncedCallback } from '../../hooks/createDebouncedCallback';
import { TextItem } from './parts/TextItem';
import Enhanced from './parts/enhanced';
import Element from './parts/Element';

interface headerPropsType {
    string: string;
}

interface treePropsType {
    ary: itemsType;
    primary: boolean;
    head: string;
}

let enhancedElement = new Map();
enhancedElement.set(true, Enhanced(Element, 'wrapper-primary', 'wrapper-primary-outer', 'distancer'));
enhancedElement.set(false, Enhanced(Element, 'wrapper-secondary', 'wrapper-secondary-outer', 'distancer'));

//enhancer wrapps Text Item with class suitable for subtree header
const SecondaryHeaderText = Enhanced(TextItem, 'wrapper-secondary');

let Header = new Map();
Header.set(true, Enhanced(TextItem, 'top-header'));
Header.set(false, function (props: headerPropsType) {
    const { string } = props;
    const { removeItem } = useDispatchAction();
    const handleClick = useDebouncedCallback(removeItem, [undefined, string]);
    return (
        <div className="element">
            <SecondaryHeaderText string={string} />
            <DeleteItemButton nodeText={string} handleClick={handleClick} />
        </div>
    );
});

//Tree is quite versatile component that renders both main scheme and subtree
// Prop 'primary' keeps information (as boolean) whether its main scheme or its subtree and rules its behavior and view.

/**
 *  Versatile component which renders both main scheme or subtree
 * @param primary determines whether it will return main scheme( primary = true) or subscheme(primary = false)
 * @param head  heading element
 * @param ary its content - node names
 * @returns component of main scheme or subtree
 */

const Tree = (props: treePropsType) => {
    const { ary, primary, head } = props;
    const header = primary ? head : (ary.shift() as string);
    const HeadingElement = Header.get(primary);
    const WrapperStyle = primary ? 'contentWrapperPrimary' : 'contentWrapperSecondary';
    const EnhancedElement = enhancedElement.get(primary);

    return ary ? (
        <React.Fragment>
            <HeadingElement string={header} />
            <div className={WrapperStyle}>
                {ary.map(item => (
                    <EnhancedElement key={item} itemOrItemsArray={item} header={header} />
                ))}
                <AppendItemButton string={header} primary={primary} />
            </div>
        </React.Fragment>
    ) : null;
};

Tree.propTypes = {
    ary: PropTypes.array,
    primary: PropTypes.bool,
    head: PropTypes.string,
};

export default Tree;
