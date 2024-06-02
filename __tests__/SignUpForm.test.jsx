import { render, screen } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';

import SignUpForm from '../src/components/Auth/SignUpForm';

const component = (
  <BrowserRouter>
    <SignUpForm />
  </BrowserRouter>
);

describe('Testing SignUp Component', () => {
  test('Should render "Create new account"', () => {
    render(component);

    expect(
      screen.getByText('Create new account', { exact: true })
    ).toBeInTheDocument();
  });

  test('Should render "Login here"', () => {
    render(component);

    expect(
      screen.getByText('login here', { exact: false })
    ).toBeInTheDocument();
  });
});
