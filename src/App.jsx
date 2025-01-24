import { Route, Switch, Redirect } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import useAuthContext from "./context/AuthContext";

import Header from "./components/Header";
import Footer from "./components/Footer";
import NotFoundPage from "./pages/NotFoundPage";

import LandingPage from "./pages/LandingPage";

import AuthLayout from "./layouts/AuthLayout";
import LoginPage from "./pages/auth/LoginPage";
import SignUpPage from "./pages/auth/SignUpPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";

import DashboardLayout from "./layouts/DashboardLayout";
import DashboardPage from "./pages/DashboardPage";
import ProfilePage from "./pages/ProfilePage";
import ExpensesPage from "./pages/ExpensesPage";
import IncomesPage from "./pages/IncomesPage";
import CategoriesPage from "./pages/CategoriesPage";

export default function App() {
  const { loggedIn } = useAuthContext();

  return (
    <>
      <Toaster position="top-center" toastOptions={{ duration: 5000 }} />
      <Header />
      <Switch>
        <Route path="/" exact>
          {!loggedIn ? <LandingPage /> : <Redirect to="/dashboard" />}
        </Route>

        {/* Auth Routes */}
        <Route path={["/login", "/signup", "/forgot-password"]}>
          {!loggedIn ? (
            <AuthLayout>
              <Switch>
                <Route path="/login" exact component={LoginPage} />
                <Route path="/signup" exact component={SignUpPage} />
                <Route
                  path="/forgot-password"
                  exact
                  component={ForgotPasswordPage}
                />
              </Switch>
            </AuthLayout>
          ) : (
            <Redirect to="/dashboard" />
          )}
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
                <Route path="/incomes" exact component={IncomesPage} />
                <Route path="/expenses" exact component={ExpensesPage} />
                <Route path="/categories" exact component={CategoriesPage} />
                <Route path="/profile" exact component={ProfilePage} />
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
