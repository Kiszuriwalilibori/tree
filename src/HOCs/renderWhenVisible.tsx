interface isVisible {
    isVisible: boolean;
}

function renderWhenIsVisible(Component: React.ComponentType<isVisible | any>) {
    return function (props: isVisible | any) {
        let { isVisible, ...newProps } = props;
        return props.isVisible ? <Component {...newProps} /> : null;
    };
}

export default renderWhenIsVisible;
