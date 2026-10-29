import {Route, Routes} from 'react-router'
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage.jsx"
import RegisterPage from "./pages/RegisterPage"
import CheckoutPage from "./pages/CheckoutPage"
import ItemPage from "./pages/ItemPage"
import ForgotPasswordPage from "./pages/ForgotPasswordPage"
import ResetPasswordPage from "./pages/ResetPasswordPage"
import ProfilePage from "./pages/ProfilePage"
import { AuthContextProvider, AuthContext} from "./context/AuthContext"
import { CartContextProvider } from './context/CartContext'
import ProtectedRoutes from "./utils/ProtectedRoutes"
import PublicRoutes from "./utils/PublicRoutes"
import { useContext } from "react"

// Remove these imports from the top
// import { useContext } from "react"
// import { AuthContext } from "./context/AuthContext"

const App = () => {
  return (
    <AuthContextProvider>
      <CartContextProvider>
        <AppContent />
      </CartContextProvider> 
    </AuthContextProvider>
  );
};

// Create a new component that uses the context
const AppContent = () => {
  const auth = useContext(AuthContext);
  const { authLoading } = auth;
  // console.log("App rendering, current user:", user);

  if (authLoading) {
    return <div data-theme="synthwave" className="flex items-center justify-center h-screen w-screen">
      <span className="loading loading-spinner loading-xl"></span>
    </div>;
  }
  
  return (
    <div data-theme="synthwave" className='min-h-screen w-screen'>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/item/:id" element={<ItemPage />} />
        <Route path="/reset-password/:id/:token" element={<ResetPasswordPage />} />

        <Route element={<PublicRoutes />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot" element={<ForgotPasswordPage />} />
        </Route>

        <Route element={<ProtectedRoutes />}>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;