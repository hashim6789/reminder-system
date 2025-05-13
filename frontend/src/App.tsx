import "./index.css"; // Make sure Tailwind is imported
import { Toaster } from "sonner";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routers/AppRouter";
import { ThemeProvider } from "next-themes";

function App() {
  return (
    <ThemeProvider>
      <Toaster richColors position="top-right" />
      <Router>
        <AppRoutes />
      </Router>
    </ThemeProvider>
  );
}

export default App;
