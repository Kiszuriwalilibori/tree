//Header mógłby być funkcją przyjmującą dwa propsy i zawracającą komponent a nie obiekt

import React, { lazy, Suspense } from "react";
import { DeleteItemButton } from "./DeleteItemButton";
import EmptyLoader from "./EmptyLoader";
import PropTypes from 'prop-types';

const AppendItemButton = lazy(() => import("./AppendItemButton"));
// interface enhancedTypes {
//   Component:any,
//   classInner:string,
//   classOuter:string,
//   distancer:string
// }
//HOC creating function
//distancer is entity that renders horizontal line to the left of elements. class_outer and _inner wrap component accordingly
const enhanced = (Component, classInner, classOuter, distancer) => {
  return (props) => (
    <div className={classOuter}>
      <div className={distancer}></div>
      <div className={classInner}>
        <Component {...props} />
      </div>
    </div>
  );
};

//basic element -string within <span>
const TextItem = (props) => {
  const { string } = props;
  return <span className="TextItem">{string}</span>;
};

//Element renders node of scheme which could be single criterium field or subtree of fields, depending of props.
//If prop 'string' is string it renders single field, if not it renders subtree
//header prop is not read here but passed to Delete component which removes field

const Element = (props) => {
  const { string, header } = props;

  if (typeof string === "string") {
    return (
      <div className="element">
        <TextItem string={string} />
        <DeleteItemButton string={string} header={header} />
      </div>
    );
  } else {
    return <Tree ary={string} primary={false} />;
  }
};

//object that returns calls to enhancer together with two sets of parameters
//In this project case tree cand be only main or subtree and boolean fits well, in more complex case the prop shpuld be more flexible.

const enhancedElement = {
  true: enhanced(Element, "wrapper-primary", "wrapper-primary-outer", "distancer"),
  false: enhanced(Element, "wrapper-secondary", "wrapper-secondary-outer", "distancer"),
};

//enhancer wrapps Text Item with class suitable for subtree header
const SecondaryHeaderText = enhanced(TextItem, "wrapper-secondary");

// renders header up to props ( in main scheme there is no remove button)
const Header = {
  true: enhanced(TextItem, "top-header"),
  false: function (props) {
    const { string } = props;
    return (
      <div className="element">
        <SecondaryHeaderText string={string} />
        <DeleteItemButton string={string} />
      </div>
    );
  },
};

//Tree is quite versatile component that renders both main scheme and subtree
// Prop 'primary' keeps information (as boolean) whether its main scheme or its subtree and rules its behavior and view.

export const Tree = (props) => {
  const { ary, primary, head } = props;
  const header = primary ? head : ary.shift();
  const HeadingElement = Header[primary];
  const WrapperStyle = primary ? "contentWrapperPrimary" : "contentWrapperSecondary";
  const EnhancedElement = enhancedElement[primary];

  return ary ? (
    <React.Fragment>
      <HeadingElement string={header} />
      <div className={WrapperStyle}>
        {ary.map((item) => (
          <EnhancedElement key={item} string={item} header={header} />
        ))}
        <Suspense fallback={EmptyLoader()}>
          <AppendItemButton string={header} primary={primary} />
        </Suspense>
      </div>
    </React.Fragment>
  ) : null;
};


Tree.propTypes ={
  ary: PropTypes.array,
  primary: PropTypes.bool,
  head:PropTypes.string,
}

Header.propTypes ={
  string: PropTypes.string
}