import { render } from '@testing-library/react';

import Header from './Header';

test('renders header element', () => {
    const { getByRole } = render(<Header />);
    const headerElement = getByRole('banner');
    expect(headerElement).toBeInTheDocument();
});

// TODO: Create 'renders header element with class' test
// TODO: Create 'renders element with dynamic class' test
// TODO: Create 'renders element with children' test
