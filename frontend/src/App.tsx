import "./index.css"; // Make sure Tailwind is imported
import { Toaster } from "sonner";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routers/AppRouter";
import { ThemeProvider } from "./components/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="theme">
      <Toaster richColors position="top-right" />
      <Router>
        <AppRoutes />
      </Router>
    </ThemeProvider>
  );
}

export default App;
