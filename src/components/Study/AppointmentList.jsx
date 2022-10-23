import {useCallback, useEffect, useState} from "react";
import {appointmentList} from "@/apis/index.js";

export default ({date}) => {
  const [appointments, setAppointments] = useState([{}])

  useEffect(() => {
    appointmentList(date)
      .then(res => {
        setAppointments(res.data)
      })
  }, [date])

  const getStateElement = useCallback(
    (state) => {
      switch (state){
        case 'gathering':
          return (<span className="badge badge-warning">모집중</span>)
        default:
          return (<span className="badge badge-error">없음</span>)
      }
    }, []);


  return (<div>
    <table className="table table-zebra w-full max-w-[600px] mx-auto text-center">
      <thead>
        <tr>
          <th>type</th>
          <th>date</th>
          <th>place</th>
          <th>price</th>
          <th>state</th>
        </tr>
      </thead>
      <tbody>
      {
        appointments && appointments.map((appointment, idx) =>
          <tr key={idx}>
            <td>{appointment?.type?.select?.name}</td>
            <td>{appointment?.date?.date?.start}</td>
            <td>{appointment?.place?.rich_text[0]?.plain_text}</td>
            <td>{appointment?.price?.number}</td>
            <td>{getStateElement(appointment?.state?.select?.name)}</td>
          </tr>
        )
      }
      </tbody>
    </table>
  </div>)
}