import {useCallback, useEffect, useState} from "react";
import {useRecoilValue} from "recoil";
import {recoilName} from "@/store/auth.js";
import dayjs from "dayjs";
import {payment} from "@/apis/index.js";

export default () => {
  const username = useRecoilValue(recoilName)
  const [month, setMonth] = useState(dayjs().format('M'))

  const getMonthCalc = useCallback(() => {
    payment(month)
      .then((res) => {
        console.log(res.data)


      })
  }, [month])

  useEffect(() => {
    username && getMonthCalc()
  }, [])

  const handleChange = (e) => {
    setMonth(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    getMonthCalc()
  }

  return (<form className="flex flex-col justify-center p-16 w-full" onSubmit={handleSubmit}>
      <div className="form-control w-[60%] max-w-xs mx-auto mb-8">
        <label className="label" htmlFor="month">
          <span className="label-text">month</span>
        </label>
        <input required={true} type="number" className="input input-bordered w-full max-w-xs"
               id="month" name="month" defaultValue={month} onChange={handleChange}/>
      </div>
      <input type="submit" className="btn btn-info btn-sm inline mx-auto" value="submit"/>
    </form>)
}
