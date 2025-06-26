import {React, Route, Routes} from 'react-router'
import homePage from "./pages/homePage"
import loginPage from "./pages/loginPage"


const App = () => {
  return (
    <div data-theme="synthwave">
      hello
      <button className='bg-red-400'></button>
      <Routes>
        <Route path="/" element={<homePage/>}></Route>
        <Route path="/login" element={<loginPage />}></Route>
      </Routes>
      
    </div>
  )
}

export default App
