import {NavLink} from "react-router-dom";
import useGlobal from "@/hooks/useGlobal.jsx";
import {useCallback, useEffect} from "react";
import dayjs from "dayjs";
import {useRecoilState, useRecoilValue} from "recoil";
import {recoilLogged} from "@/store/auth.js";

export default () => {
  const [logged, setLogged] = useRecoilState(recoilLogged)
  const mainUrl = useGlobal('MAIN_URL');
  const isLogged = useCallback(
    () => {
      const token = atob(localStorage.getItem('token'))
      return token && dayjs(token.split('.').last()).isAfter(dayjs());
    },
    [],
  );

  useEffect(() => {
    return () => {
      setLogged(isLogged())
    };
  }, []);

  return (
    <nav className="flex mb-4 p-4 gap-2 justify-center">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl" href={mainUrl}>Weekly Study</a>
      </div>
      <NavLink className={ a => `btn btn-info active-${a.isActive}` } to={'/'}>Home</NavLink>
      { !logged && <NavLink className={ a => `btn btn-info active-${a.isActive}` } to={'/register'}>register</NavLink> }
      { !logged && <NavLink className={ a => `btn btn-info active-${a.isActive}` } to={'/login'}>login</NavLink>}
      { logged &&  <NavLink className={ a => `btn btn-info active-${a.isActive}` } to={'/appointment'}>Appointment</NavLink>}
    </nav>
  )
}