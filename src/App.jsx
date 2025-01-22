import { Route, Switch, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import Header from "./components/Header";
import Footer from "./components/Footer";
import DashboardLayout from "./layouts/DashboardLayout";

import LandingPage from "./pages/LandingPage";

import LoginPage from "./pages/auth/LoginPage";
import SignUpPage from "./pages/auth/SignUpPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";

import DashboardPage from "./pages/DashboardPage";
import ProfilePage from "./pages/ProfilePage";
import ExpensesPage from "./pages/ExpensesPage";
import IncomesPage from "./pages/IncomesPage";
import CategoriesPage from "./pages/CategoriesPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  const loggedIn = useSelector((state) => state.authState.loggedIn);

  return (
    <>
      <Header />
      <Switch>
        <Route path="/" exact>
          {!loggedIn ? <LandingPage /> : <Redirect to="/dashboard" />}
        </Route>

        <Route path="/login">
          {!loggedIn ? <LoginPage /> : <Redirect to="/dashboard" />}
        </Route>

        <Route path="/signup">
          {!loggedIn ? <SignUpPage /> : <Redirect to="/dashboard" />}
        </Route>

        <Route path="/forgot-password">
          {!loggedIn ? <ForgotPasswordPage /> : <Redirect to="/dashboard" />}
        </Route>

        {/* Dashboard Routes */}
        <Route
          path={[
            "/dashboard",
            "/profile",
            "/expenses",
            "/incomes",
            "/categories",
            "/settings",
          ]}
        >
          {loggedIn ? (
            <DashboardLayout>
              <Switch>
                <Route path="/dashboard" exact component={DashboardPage} />
                <Route path="/profile" exact component={ProfilePage} />
                <Route path="/expenses" exact component={ExpensesPage} />
                <Route path="/incomes" exact component={IncomesPage} />
                <Route path="/categories" exact component={CategoriesPage} />
              </Switch>
            </DashboardLayout>
          ) : (
            <Redirect to="/login" />
          )}
        </Route>

        <Route>
          <NotFoundPage />
        </Route>
      </Switch>
      {!loggedIn && <Footer />}
    </>
  );
}
