import { render, screen } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store } from '../src/store';
import App from '../src/App';

test('Should render "Sign in to your account" on intial render', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
  const linkElement = screen.getByText('Sign in to your account');
  expect(linkElement).toBeInTheDocument();
});
