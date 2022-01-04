import userEvent from '@testing-library/user-event';
import { TextItem } from '../../../../src/components/Tree/parts/TextItem';
import Element from '../../../../src/components/Tree/parts/Element';
import AppProvider from '../../../../src/components/AppProvider';
import ReactDOM from 'react-dom';
import { render, screen, cleanup } from '../../../test-utils/testing-library-utils';

const stringProp = 'testString';
const headerProp = 'headerString';
const stringArray = ['testA', 'testB', 'testC'];

describe('Element test suite with itemOrItemsArray being string', () => {
    beforeEach(() => {
        render(<Element itemOrItemsArray={stringProp} header={headerProp} />);
    });

    afterEach(() => cleanup());
    test('when two strings are passed as props it renders single element with delete button', () => {
        const element = document.getElementById(stringProp);
        expect(element).toBeInTheDocument();
        const treeItems = screen.getAllByRole('treeitem');
        expect(treeItems).toHaveLength(1);
        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();
    });
});
