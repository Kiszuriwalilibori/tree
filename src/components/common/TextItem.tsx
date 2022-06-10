interface textItemPropsType {
    str: string;
}
/**
 * Displays span with text inside
 * @param {string} string text to be displayed
 * @returns component being single span with strng content
 */

const TextItem = (props: textItemPropsType) => {
    const { str } = props;
    return <span className="TextItem">{str}</span>;
};

export default TextItem;
