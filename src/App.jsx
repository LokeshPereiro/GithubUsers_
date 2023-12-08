import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PrivateRoute } from "./routes";
import { Dashboard, ErrorPage, SignupPage } from "./pages";
import { AuthWrapper } from "./utils";
function App() {
  return (
    <AuthWrapper>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path="login" element={<SignupPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </AuthWrapper>
  );
}

export default App;
