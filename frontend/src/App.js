import "./App.css";
import { ThemeProvider as MaterialThemeProvider } from "@material-ui/styles";
import AuthProvider from "./context/AuthProvider";
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
      secondary: {
        main: "#005f6a",
      },
    },
    spacing: 2,
    typography: { useNextVariants: true },
  });

  return (
    <MaterialThemeProvider theme={theme}>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <Navigation />
        </QueryClientProvider>
      </AuthProvider>
    </MaterialThemeProvider>
  );
}

export default App;
