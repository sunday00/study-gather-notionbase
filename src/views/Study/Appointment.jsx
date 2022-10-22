import dayjs from "dayjs";
import weekday from 'dayjs/plugin/weekday'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import AppointmentList from "@c/Study/AppointmentList.jsx";
import AppointmentCreater from "@c/Study/AppointmentCreater.jsx";

dayjs.extend(weekday)
dayjs.extend(utc)
dayjs.extend(timezone)
const current = dayjs.tz(dayjs(), 'Asia/Seoul')
const calculateThisSunday = current.day() ? 7 : 0
const date = current.weekday(calculateThisSunday).format('YYYY-MM-DD')

export default () => {
  return (<div>
      <AppointmentList date={date} />

      <AppointmentCreater date={date} />
    </div>)
}