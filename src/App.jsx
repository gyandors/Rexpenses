import { useContext } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import AuthContext from './context/AuthContext';

import Header from './components/Header/Header';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ExpensesPage from './pages/ExpensesPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  const authCtx = useContext(AuthContext);

  return (
    <>
      <Header />
      <Switch>
        <Route path="/" exact>
          <Redirect to="/profile" />
        </Route>

        <Route path="/profile">
          {authCtx.loggedIn ? <ProfilePage /> : <Redirect to="/login" />}
        </Route>

        <Route path="/expenses">
          {authCtx.loggedIn ? <ExpensesPage /> : <Redirect to="/login" />}
        </Route>

        <Route path="/login">
          {!authCtx.loggedIn ? <LoginPage /> : <Redirect to="/profile" />}
        </Route>

        <Route path="/signup">
          {!authCtx.loggedIn ? <SignUpPage /> : <Redirect to="/profile" />}
        </Route>

        <Route path="/forgot-password">
          {!authCtx.loggedIn ? (
            <ForgotPasswordPage />
          ) : (
            <Redirect to="/profile" />
          )}
        </Route>

        <Route>
          <NotFoundPage />
        </Route>
      </Switch>
    </>
  );
}
