import { render, fireEvent } from '../../test-utils/testing-library-utils';
import DeleteItemButton from '../../../src/components/DeleteItemButton';

const handleClickMock = jest.fn();
const nodeText = 'test123';
beforeEach(() => {
    render(<DeleteItemButton nodeText={nodeText} handleClick={handleClickMock} />);
});
describe('Given DeleteItemButton component ', () => {
    test('calls function passed by handleClick prop when clicked', () => {
        const button = document.querySelector('button');
        expect(button).toBeInTheDocument();
        fireEvent.click(button);
        expect(handleClickMock).toBeCalledTimes(1);
    });
    test('displays button element with aria-label="delete-button" and itemProp being nodeText', () => {
        const button = document.querySelector(`button[itemProp=${nodeText}][aria-label=${`delete-button`}]`);
        expect(button).toBeInTheDocument();
    });
    test('renders icon of proper class', () => {
        const icon = document.querySelector('i.fas.fa-minus-circle.delete');
        expect(icon).toBeInTheDocument();
    });
});
