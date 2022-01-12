import InvalidTextWarning from '../../src/components/Warning';
import { render, screen } from '@testing-library/react';
import { warnings } from '../../src/config';

describe('Warning tests suite', () => {
    test('Alert must be visible and display given warning test when passed prop isActive ="true" and warningText being given string', () => {
        render(<InvalidTextWarning isActive={true} warningText={warnings.missingAlphaChars} />);
        const napis = screen.getByText(new RegExp(warnings.missingAlphaChars, 'i'));
        expect(napis).toBeInTheDocument();
        const alert = screen.getByRole('alert');
        expect(alert).toBeInTheDocument();
    });
    test('Warning may not be visible when component is rendered with false', () => {
        render(<InvalidTextWarning isActive={false} warningText={warnings.missingAlphaChars} />);
        expect(screen.queryByText(new RegExp(warnings.missingAlphaChars, 'i'))).toBeNull();
        const alert = screen.queryByRole('alert');
        expect(alert).toBeNull();
    });
});
