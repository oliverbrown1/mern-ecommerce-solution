import {Route, Routes} from 'react-router'
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage.jsx"
import RegisterPage from "./pages/RegisterPage"
import CheckoutPage from "./pages/CheckoutPage"
import ItemPage from "./pages/ItemPage"
import ForgotPasswordPage from "./pages/ForgotPasswordPage"
import ResetPasswordPage from "./pages/ResetPasswordPage"
import ProfilePage from "./pages/ProfilePage"


const App = () => {
  return (
    <div data-theme="synthwave" className='min-h-screen w-screen'>
      <Routes>
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="/checkout" element={<CheckoutPage />}></Route>
        <Route path="/item/:id" element={<ItemPage />}></Route>
        <Route path="/forgot" element={<ForgotPasswordPage />}></Route>
        <Route path="/reset-password" element={<ResetPasswordPage />}></Route>
        <Route path="/profile" element={<ProfilePage />}></Route>
      </Routes>
      
    </div>
  )
}

export default App
