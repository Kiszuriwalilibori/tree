//Header mógłby być funkcją przyjmującą dwa propsy i zawracającą komponent a nie obiekt

import React from 'react';
import DeleteItemButton from './DeleteItemButton';
import PropTypes from 'prop-types';
import { itemsType } from '../types';
import AppendItemButton from './AppendItemButton';

interface headerPropsType {
    string: string;
}
interface textElementPropsType {
    string: string;
}
interface elementPropsType {
    string: string;
    header: string | undefined;
}
interface treePropsType {
    ary: itemsType;
    primary: boolean;
    head: string;
}

//const AppendItemButton = lazy(() => import('./AppendItemButton'));

//HOC creating function
//distancer is entity that renders horizontal line to the left of elements. class_outer and _inner wrap component accordingly
const enhanced = (Component: any, classInner = '', classOuter = '', distancer = '') => {
    return props => (
        <div className={classOuter}>
            <div className={distancer}></div>
            <div className={classInner}>
                <Component {...props} />
            </div>
        </div>
    );
};

//basic element -string within <span>
const TextItem = (props: textElementPropsType) => {
    const { string } = props;
    return (
        <span role="tree_item" className="TextItem" data-span-name={string}>
            {string}
        </span>
    );
};

//Element renders node of scheme which could be single criterium field or subtree of fields, depending of props.
//If prop 'string' is string it renders single field, if not it renders subtree
//header prop is not read here but passed to Delete component which removes field

const Element = (props: elementPropsType) => {
    const { string, header } = props;
    if (typeof string === 'string') {
        return (
            <div className="element" id={string}>
                <TextItem string={string} />
                <DeleteItemButton string={string} header={header} />
            </div>
        );
    } else {
        return <Tree ary={string} primary={false} head={''} />;
    }
};

//object that returns calls to enhancer together with two sets of parameters
//In this project case tree cand be only main or subtree and boolean fits well, in more complex case the prop shpuld be more flexible.
let enhancedElement = new Map();
enhancedElement.set(true, enhanced(Element, 'wrapper-primary', 'wrapper-primary-outer', 'distancer'));
enhancedElement.set(false, enhanced(Element, 'wrapper-secondary', 'wrapper-secondary-outer', 'distancer'));

//enhancer wrapps Text Item with class suitable for subtree header
const SecondaryHeaderText = enhanced(TextItem, 'wrapper-secondary');

let Header = new Map();
Header.set(true, enhanced(TextItem, 'top-header'));
Header.set(false, function (props: headerPropsType) {
    const { string } = props;
    return (
        <div className="element">
            <SecondaryHeaderText string={string} />
            <DeleteItemButton string={string} header={undefined} />
        </div>
    );
});

//Tree is quite versatile component that renders both main scheme and subtree
// Prop 'primary' keeps information (as boolean) whether its main scheme or its subtree and rules its behavior and view.

export const Tree = (props: treePropsType) => {
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
                    <EnhancedElement key={item} string={item} header={header} />
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
