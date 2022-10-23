import {useRecoilState} from "recoil";
import {recoilLogged} from "@/store/auth.js";
import {Route, Routes, Navigate} from "react-router-dom";
import Appointment from "@v/Study/Appointment.jsx";
import {tokenIsValid} from "@/utils/auth.js";
import {useEffect} from "react";

export default () => {
  const logged = tokenIsValid()
  const [currentLogged, setRecoilLogged] = useRecoilState(recoilLogged)

  useEffect(() => {
    if(!logged && location.pathname !== '/login' && location.pathname !== '/register'){
      setRecoilLogged(false)
    }
  }, [])


  return (<>
    <Routes>
      {!currentLogged && <Route path="*" element={<Navigate replace to="/login" />}></Route>}
      {currentLogged &&
        <Route path={"/appointment"} element={<Appointment/>}></Route>}
    </Routes>
  </>)
}