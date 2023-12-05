interface RenderCondition {
    condition: boolean;
}

function renderConditionally(Component: React.ComponentType<RenderCondition | any>) {
    return function (props: RenderCondition | any) {
        let { condition, ...newProps } = props;
        return props.condition ? <Component {...newProps} /> : null;
    };
}

export default renderConditionally;
