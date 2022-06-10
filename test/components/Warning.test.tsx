import Warning from '../../src/components/Warning';
import { render, screen } from '@testing-library/react';
import { warnings } from '../../src/config';

/*
TODO: lepiej byłoby zmockować {warnings}
*/

const props = {
    inactiveWithValidText: {
        isActive: false,
        warningText: warnings.missingAlphaChars,
    },
    inactiveWithInvalidText: {
        isActive: false,
        warningText: '',
    },
    activeWithValidText: {
        isActive: true,
        warningText: warnings.missingAlphaChars,
    },
    activeWithInvalidText: {
        isActive: true,
        warningText: '',
    },
};

describe('Given InvalidRestWarning component', () => {
    test('Alert must be visible and display given warning test when passed prop isActive ="true" and warningText being given string', () => {
        const { container } = render(<Warning {...props.activeWithValidText} />);
        expect(container).not.toBeEmptyDOMElement();
        const napis = screen.getByText(new RegExp(warnings.missingAlphaChars, 'i'));
        expect(napis).toBeInTheDocument();
        const alert = screen.getByRole('alert');
        expect(alert).toBeInTheDocument();
    });
    test('Warning may not be visible when component is rendered with prop  false', () => {
        const { container } = render(<Warning {...props.inactiveWithValidText} />);
        expect(container).toBeEmptyDOMElement();
    });
    test('Alert may not be visible  when passed prop isActive = true but warningText not being truthy string', () => {
        const { container } = render(<Warning {...props.inactiveWithInvalidText} />);
        expect(container).toBeEmptyDOMElement();
    });
    test('Warning may not be visible when component is rendered with prop isActive false and warningText not being truthy string', () => {
        const { container } = render(<Warning {...props.activeWithInvalidText} />);
        expect(container).toBeEmptyDOMElement();
    });
});
