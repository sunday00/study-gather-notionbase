import dayjs from "dayjs";
import weekday from 'dayjs/plugin/weekday'
import {useEffect, useState} from "react";
import {appointment} from "@/apis/index.js";
import AppointmentList from "@c/Study/AppointmentList.jsx";
import AppointmentCreater from "@c/Study/AppointmentCreater.jsx";

dayjs.extend(weekday)
const date = dayjs().weekday(7).format('YYYY-MM-DD')

export default () => {
  return (<div>
      <AppointmentList date={date} />

      <AppointmentCreater date={date} />
    </div>)
}