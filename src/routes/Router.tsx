import { Routes, Route } from "react-router-dom"
import Home from "../pages/home/Home"
import Login from "../pages/login/Login"
import Signup from "../pages/signup/Signup"
import Account from "../pages/account/Account"



const Router = ()=>{
    return(
        <Routes>
            <Route path="/e-commerce" element={<Home/>}/>
            <Route path="/e-commerce/login" element={<Login/>}/>
            <Route path="/e-commerce/signup" element={<Signup/>}/>
            <Route path="/e-commerce/account" element={<Account/>}/>
        </Routes>
    )
}

export default Router