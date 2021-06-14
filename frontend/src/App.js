import {Route, Switch} from "react-router-dom";
import './App.css';
import NavHeader from "./components/NavHeader";
import LoginPage from "./Pages/LoginPage";
import {ThemeProvider} from '@primer/components'


function App() {
  return (
      <ThemeProvider>
        <NavHeader/>
        <Switch>
          <Route path={'/'} exact>
            <LoginPage/>
          </Route>
        </Switch>
      </ThemeProvider>
  )
}

export default App;
