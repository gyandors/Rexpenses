import { Route, Switch, Redirect } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";

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

import { auth, db } from "./firebase";
import { setCategories } from "./reducers/categorySlice";
import { setExpenses } from "./reducers/expenseSlice";
import { setIncomes } from "./reducers/incomeSlice";

export default function App() {
  const { loggedIn } = useAuthContext();

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesQuerySnapshot = await getDocs(
          collection(db, "categories")
        );
        const expensesQuerySnapshot = await getDocs(collection(db, "expenses"));
        const incomesQuerySnapshot = await getDocs(collection(db, "incomes"));

        const categories = categoriesQuerySnapshot.docs.map((doc) => {
          return {
            ...doc.data(),
            id: doc.id,
          };
        });

        const expenses = expensesQuerySnapshot.docs.map((doc) => {
          return {
            ...doc.data(),
            id: doc.id,
          };
        });

        const incomes = incomesQuerySnapshot.docs.map((doc) => {
          return {
            ...doc.data(),
            id: doc.id,
          };
        });

        onAuthStateChanged(auth, (user) => {
          if (user) {
            const filteredCategories = categories.filter(
              (c) => c.userId === user.uid
            );

            const filteredExpenses = expenses.filter(
              (e) => e.userId === user.uid
            );

            const filteredIncomes = incomes.filter(
              (i) => i.userId === user.uid
            );

            dispatch(setCategories(filteredCategories));
            dispatch(setExpenses(filteredExpenses));
            dispatch(setIncomes(filteredIncomes));
          }
        });
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong " + error.message);
      }
    };

    loggedIn && fetchData();
  }, [dispatch, loggedIn]);

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
