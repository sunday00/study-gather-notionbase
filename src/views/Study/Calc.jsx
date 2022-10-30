import {useCallback, useEffect, useState} from "react";
import {useRecoilValue} from "recoil";
import {recoilUserId} from "@/store/auth.js";
import dayjs from "dayjs";
import {payment} from "@/apis/index.js";

export default () => {
  const userId = useRecoilValue(recoilUserId)
  const [month, setMonth] = useState(dayjs().format('M'))

  const getMonthCalc = useCallback(() => {
    payment(month)
      .then((res) => {
        const myAttendsList = res.data.attendsList.filter((a) => a.me)
        const totalPrice = myAttendsList.map(a => a.price / a.attendsCount)

        console.log(totalPrice.reduce((tot, cur) => tot + cur))
      })
  }, [month])

  useEffect(() => {
    userId && getMonthCalc()
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
