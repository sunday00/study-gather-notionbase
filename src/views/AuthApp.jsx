import {useRecoilState} from "recoil";
import {recoilLogged} from "@/store/auth.js";
import {Route, Routes, Navigate, useLocation} from "react-router-dom";
import Appointment from "@v/Study/Appointment.jsx";
import {tokenIsValid} from "@/utils/auth.js";
import {useEffect} from "react";
import Home from "@v/Home.jsx";
import Register from "@v/Auth/Register.jsx";
import Login from "@v/Auth/Login.jsx";

export default () => {
  const [currentLogged, setRecoilLogged] = useRecoilState(recoilLogged)
  const location = useLocation()

  useEffect(() => {
    if(tokenIsValid()){
      setRecoilLogged(true)
    } else setRecoilLogged(false)
  }, [location])

  return (<>
    <Routes>
      <Route path="/" element={<Home/>} exact={true}></Route>
      <Route path={"/register"} element={<Register />}></Route>
      <Route path={"/login"} element={<Login />}></Route>
      {!currentLogged && <Route path="*" element={<Navigate replace to="/login" />}></Route>}
      {currentLogged &&
        <Route path={"/appointment"} element={<Appointment/>}></Route>}
    </Routes>
  </>)
}