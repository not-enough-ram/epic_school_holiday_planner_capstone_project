import "./App.css";
import NavHeader from "./components/NavHeader";
import { ThemeProvider as MaterialThemeProvider } from "@material-ui/styles";
import AuthProvider from "./context/AuthProvider";
import BottomNav from "./components/BottomNav";
import { createMuiTheme } from "@material-ui/core/styles";
import { QueryClient, QueryClientProvider } from "react-query";
import Navigation from "./routing/Navigation";

const queryClient = new QueryClient();

function App() {
  const theme = createMuiTheme({
    palette: {
      primary: {
        dark: "#22272e",
        main: "#2d333b",
        light: "#adbac7",
      },
    },
    spacing: 2,
    typography: { useNextVariants: true },
  });

  return (
    <MaterialThemeProvider theme={theme}>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <NavHeader />
          <Navigation />
          <BottomNav />
        </QueryClientProvider>
      </AuthProvider>
    </MaterialThemeProvider>
  );
}

export default App;
