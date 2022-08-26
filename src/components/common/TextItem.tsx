interface Props {
    str: string;
}
/**
 * Displays span with text inside
 * @param {string} string text to be displayed
 * @returns component being single span with string content
 */

const TextItem = (props: Props) => {
    const { str } = props;
    return <span className="TextItem">{str}</span>;
};

export default TextItem;
