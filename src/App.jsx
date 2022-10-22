import Home from '@v/Home.jsx';
import {RecoilRoot} from "recoil";
import {NavLink, Route, Routes} from "react-router-dom";
import useGlobal from "@/hooks/useGlobal.jsx";
import Register from "@v/Auth/Register";
import Login from "@v/Auth/Login.jsx";
import Nav from "@c/Nav.jsx";
import Appointment from "@v/Study/Appointment";

function App() {
  return (
    <RecoilRoot>
      <div className="App" data-theme="night">
        <section className="fixed w-full">
          <Nav />
        </section>
        <section>
          <div className="h-20"></div>
          <Routes>
            <Route path="/" element={<Home/>} exact={true}></Route>
            <Route path={"/register"} element={<Register />}></Route>
            <Route path={"/login"} element={<Login />}></Route>
            <Route path={"/appointment"} element={<Appointment />}></Route>
          </Routes>
        </section>
      </div>
    </RecoilRoot>
  )
}

export default App
