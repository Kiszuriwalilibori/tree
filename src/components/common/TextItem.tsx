import { memo } from "react";

interface Props {
    text: string;
}
/**
 * Displays span with text inside
 * @param {string} string text to be displayed
 * @returns component being single span with string content
 */

export const TextItem = (props: Props) => {
    const { text } = props;

    return <span className="TextItem">{text}</span>;
};

export default memo(TextItem);
