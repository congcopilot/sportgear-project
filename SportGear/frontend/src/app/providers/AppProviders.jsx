import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../store/authStore";

function AppProviders({ children }) {
  return (
    <BrowserRouter>
      <AuthProvider>{children}</AuthProvider>
    </BrowserRouter>
  );
}

export default AppProviders;
