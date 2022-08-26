interface isVisible {
    isVisible: boolean;
}

function RenderWhenIsVisible(Component: React.ComponentType<isVisible | any>) {
    return function (props: isVisible | any) {
        let { isVisible, ...newProps } = props;
        return props.isVisible ? <Component {...newProps} /> : null;
    };
}

export default RenderWhenIsVisible;
