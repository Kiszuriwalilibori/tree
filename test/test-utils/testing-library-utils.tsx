import { render } from '@testing-library/react';
import AppProvider from '../../src/components/AppProvider';

const renderWithContext = ui => render(ui, { wrapper: AppProvider });

export * from '@testing-library/react';
export { renderWithContext as render };
