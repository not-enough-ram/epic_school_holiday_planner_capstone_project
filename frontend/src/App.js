import {Route, Switch} from "react-router-dom";
import './App.css';
import NavHeader from "./components/NavHeader";
import LoginPage from "./Pages/LoginPage";
import {ThemeProvider} from '@primer/components'
import AuthProvider from "./context/AuthProvider";


function App() {
  return (
      <ThemeProvider>
          <AuthProvider>
              <NavHeader/>
              <Switch>
                  <Route path={'/'} exact>
                      <LoginPage/>
                  </Route>
                  <Route path={'/home'} exact>
                      <LoginPage/>
                  </Route>
              </Switch>
          </AuthProvider>
      </ThemeProvider>
  )
}

export default App;
