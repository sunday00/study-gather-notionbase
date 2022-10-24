import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {login} from "@/apis/index.js";
import {useSetRecoilState} from "recoil";
import {recoilLogged, recoilName, recoilUserId} from "@/store/auth.js";

export default () => {
  const [data, setData] = useState({
    nickname: '',
    secret_code: '',
  })

  const setLogged = useSetRecoilState(recoilLogged)
  const setName = useSetRecoilState(recoilName)
  const setUserId = useSetRecoilState(recoilUserId)

  const redirect = useNavigate()

  const handleSetData = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    login(data.nickname, data.secret_code)
      .then((res) => {
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('name', res.data.name)
        localStorage.setItem('userId', res.data.id)

        setLogged(true)
        setName(res.data.name)
        setUserId(res.data.id)

        redirect('/appointment')
      }).catch(e => {
        if(e.response.status === 401) window.alert('닉네임이나 비밀코드가 잘못되었습니다.')
      })
  }

  return (<form className="flex flex-col justify-center content-center p-8" onSubmit={handleSubmit}>
    <div className="form-control w-[60%] max-w-xs mx-auto mb-8">
      <label className="label" htmlFor="nickname">
        <span className="label-text">nickname</span>
      </label>
      <input required={true} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" id="nickname" name="nickname" onChange={handleSetData} />
    </div>
    <div className="form-control w-[60%] max-w-xs mx-auto mb-8">
      <label className="label" htmlFor="secretCode">
        <span className="label-text">secret_code</span>
      </label>
      <input required={true} type="password" placeholder="Type here" className="input input-bordered w-full max-w-xs" id="secretCode" name="secret_code" onChange={handleSetData}/>
    </div>
    <input type="submit" className="btn btn-info btn-sm inline mx-auto" value="submit" />
  </form>)
}