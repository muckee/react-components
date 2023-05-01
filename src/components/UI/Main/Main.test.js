import { render } from '@testing-library/react';

import Main from './Main';

test('renders main element', () => {
    const { getByRole } = render(<Main />);
    const mainElement = getByRole('main');
    expect(mainElement).toBeInTheDocument();
});

// TODO: Create 'renders main element with class' test
// TODO: Create 'renders main element with dynamic class' test
// TODO: Create 'renders main element with children' test