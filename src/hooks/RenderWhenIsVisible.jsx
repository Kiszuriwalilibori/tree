const RenderWhenIsVisible = Component => {
    return function (props) {
        let { isVisible, ...newProps } = props;
        return props.isVisible ? <Component {...newProps} /> : null;
    };
};

export default RenderWhenIsVisible;
