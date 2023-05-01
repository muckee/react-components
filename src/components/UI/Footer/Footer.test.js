import { render } from '@testing-library/react';

import Footer from './Footer';

test('renders footer element', () => {
    const { getByTestId } = render(<Footer />);
    const footerElement = getByTestId('footer');
    expect(footerElement).toBeInTheDocument();
});

// TODO: Create 'renders footer element with class' test
// TODO: Create 'renders footer element with dynamic class' test
// TODO: Create 'renders footer element with children' test