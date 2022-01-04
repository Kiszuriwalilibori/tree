interface textItemPropsType {
    string: string;
}
/**
 * Displays span with text inside
 * @param {string} string text to be displayed
 * @returns component being single span with strng content
 */

export const TextItem = (props: textItemPropsType) => {
    const { string } = props;
    return (
        <span role="treeitem" className="TextItem">
            {string}
        </span>
    );
};
