import { Route, Switch } from 'react-router-dom';

import Header from './components/Header/Header';
import AuthPage from './components/pages/AuthPage';
import NotFoundPage from './components/pages/NotFoundPage';
// import Modal from './components/UI/Modal';

export default function App() {
  return (
    <>
      <Header />
      <Switch>
        {/* <Route path="/"><Modal /></Route> */}

        <Route path="/auth">
          <AuthPage />
        </Route>

        <Route>
          <NotFoundPage />
        </Route>
      </Switch>
    </>
  );
}
