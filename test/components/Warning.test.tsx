import InvalidTextWarning from '../../src/components/Warning';
import { render, screen } from '@testing-library/react';
import { warnings } from '../../src/config';

describe('Warning tests suite', () => {
    test('Warning must be visible when component is rendered with true', () => {
        render(<InvalidTextWarning isActive={true} warningText={warnings.missingAlphaChars} />);
        const napis = screen.getByText(new RegExp(warnings.missingAlphaChars, 'i'));
        expect(napis).toBeInTheDocument();
    });
    test('Warning may not be visible when component is rendered with false', () => {
        render(<InvalidTextWarning isActive={false} warningText={warnings.missingAlphaChars} />);
        expect(screen.queryByText(new RegExp(warnings.missingAlphaChars, 'i'))).toBeNull();
    });
});
