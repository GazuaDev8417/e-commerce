import { Routes, Route } from "react-router-dom"
import Home from "../pages/home/Home"
import Login from "../pages/login/Login"
import Signup from "../pages/signup/Signup"



const Router = ()=>{
    return(
        <Routes>
            <Route path="/e-commerce" element={<Home/>}/>
            <Route path="/e-commerce/login" element={<Login/>}/>
            <Route path="/e-commerce/signup" element={<Signup/>}/>
        </Routes>
    )
}

export default Router