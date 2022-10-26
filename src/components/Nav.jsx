import {NavLink} from "react-router-dom";
import useGlobal from "@/hooks/useGlobal.jsx";
import {useRecoilState, useSetRecoilState} from "recoil";
import {recoilLogged, recoilName, recoilUserId} from "@/store/auth.js";

export default () => {
  const mainUrl = useGlobal('MAIN_URL');
  const [logged, setLogged] = useRecoilState(recoilLogged)
  const setName = useSetRecoilState(recoilName)
  const setUserId = useSetRecoilState(recoilUserId)

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('name')
    localStorage.removeItem('userId')
    setLogged(false)
    setName('')
    setUserId('')
  }

  return (
    <nav className="flex mb-4 p-4 gap-2 justify-center">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl" href={mainUrl}>Weekly Study</a>
      </div>
      <NavLink className={ a => `btn btn-info btn-xs active-${a.isActive}` } to={'/'}>Home</NavLink>
      { !logged && <NavLink className={ a => `btn btn-info btn-xs active-${a.isActive}` } to={'/register'}>register</NavLink> }
      { !logged && <NavLink className={ a => `btn btn-info btn-xs active-${a.isActive}` } to={'/login'}>login</NavLink>}
      { logged &&  <NavLink className={ a => `btn btn-info btn-xs active-${a.isActive}` } to={'/logout'} onClick={handleLogout}>logout</NavLink>}
      { logged &&  <NavLink className={ a => `btn btn-info btn-xs active-${a.isActive}` } to={'/appointment'}>Appoint</NavLink>}
      { logged &&  <NavLink className={ a => `btn btn-info btn-xs active-${a.isActive}` } to={'/calculate'}>Calc</NavLink>}
    </nav>
  )
}