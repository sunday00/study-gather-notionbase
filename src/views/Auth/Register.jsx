import {useState} from "react"
import {me, storeUser} from "@/apis/index.js";
import {useNavigate} from "react-router-dom";
import dayjs from "dayjs";
import {useSetRecoilState} from "recoil";
import {recoilLogged} from "@/store/auth.js";

export default () => {
  const [data, setData] = useState({
    nickname: { type: 'string', content: ''},
    realname: { type: 'string', content: ''},
    favorite_place: { type: 'string', content: ''},
    lang: { type: 'string', content: ''},
    job: { type: 'string', content: ''},
    secret_code: { type: 'string', content: ''},
  })
  const setLogged = useSetRecoilState(recoilLogged)

  const redirect = useNavigate()

  const handleSetData = (e) => {
    setData({
      ...data,
      [e.target.name]: { type: data[e.target.name].type, content: e.target.value },
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    console.log(data)

    me(data.nickname, data.realname)
      .then(res => {
        const nickname = res.data?.nickname?.title[0]?.plain_text
        const realname = res.data?.realname?.rich_text[0]?.plain_text

        if(nickname === data.nickname || realname === data.realname) {
          window.alert('이미 등록된 유저입니다.')
          return false
        }

        storeUser(data)
          .then((res) => {
            localStorage.setItem(
              'token',
              btoa(`${data.nickname}.${import.meta.env.VITE_SALT}.${data.secret_code}.${dayjs().add(30, 'minutes').format('YYYY-MM-DDTHH:mm:ss')}`)
            )

            setLogged(true)

            redirect('/')
          })
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
      <label className="label" htmlFor="realName">
        <span className="label-text">real name</span>
      </label>
      <input required={true} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" id="realName" name="realname" onChange={handleSetData}/>
    </div>
    <div className="form-control w-[60%] max-w-xs mx-auto mb-8">
      <label className="label" htmlFor="favoritePlace">
        <span className="label-text">favorite place</span>
      </label>
      <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" id="favoritePlace" name="favorite_place" onChange={handleSetData}/>
    </div>
    <div className="form-control w-[60%] max-w-xs mx-auto mb-8">
      <label className="label" htmlFor="lang">
        <span className="label-text">lang</span>
      </label>
      <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" id="lang" name="lang" onChange={handleSetData}/>
    </div>
    <div className="form-control w-[60%] max-w-xs mx-auto mb-8">
      <label className="label" htmlFor="job">
        <span className="label-text">job</span>
      </label>
      <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" id="job" name="job" onChange={handleSetData}/>
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
