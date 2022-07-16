import Signup from "./components/signup/signup";
import Login from "./components/login/login";
import {BrowserRouter ,Routes, Route} from "react-router-dom";
const App=()=>{
  return(
    <>
      <h1>Ecommerce App Work</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}
export default App;