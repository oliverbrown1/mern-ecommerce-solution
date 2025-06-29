import {Route, Routes} from 'react-router'
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import CheckoutPage from "./pages/CheckoutPage"
import ItemPage from "./pages/ItemPage"
import NewPasswordPage from "./pages/NewPasswordPage"


const App = () => {
  return (
    <div data-theme="synthwave" className='min-h-screen w-screen'>
      <Routes>
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="/checkout" element={<CheckoutPage />}></Route>
        <Route path="/item/:id" element={<ItemPage />}></Route>
        <Route path="/forgotpassword" element={<NewPasswordPage />}></Route>

      </Routes>
      
    </div>
  )
}

export default App
