import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Expense from '../src/components/Expense/Expense';

import { Provider } from 'react-redux';
import { store } from '../src/store';

const component = (
  <Provider store={store}>
    <Expense />
  </Provider>
);

describe('Testing Expense', () => {
  test('Should display "No expenses found" when expense array is empty', () => {
    render(component);
    expect(
      screen.queryByText('No expenses found', { exact: false })
    ).not.toBeInTheDocument();
  });

  test('Should display button with text "Add new expense"', () => {
    render(component);
    expect(screen.getByRole('button')).toHaveTextContent('Add new expense');
  });

  test('Should display heading "Total expense"', () => {
    render(component);
    expect(screen.getByRole('heading')).toBeInTheDocument();
  });

  test('Should display list of expenses', async () => {
    window.fetch = vi.fn();

    window.fetch.mockResolvedValueOnce({
      json: async () => [
        {
          key: 'k1',
          id: 'i1',
          amount: '12',
          description: 'Some description',
          category: 'Some category',
        },
      ],
    });

    render(component);
    const listItems = await screen.findAllByRole('listitem');

    expect(listItems).not.toHaveLength(0);
  });
});
