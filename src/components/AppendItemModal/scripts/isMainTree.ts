import { AppendModalProps } from '../model';

function isMainTree(props: AppendModalProps): boolean {
    const { activeScope, items } = props;
    return activeScope === items[0];
}

export default isMainTree;
