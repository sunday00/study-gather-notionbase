import {useCallback, useEffect, useState} from "react";
import {appointmentList, attend, attendList, cancelAttend} from "@/apis/index.js";
import {useRecoilValue} from "recoil";
import {recoilName, recoilUserId} from "@/store/auth.js";
import Paid from "@c/Study/Paid.jsx";

export default ({date}) => {
  const [appointments, setAppointments] = useState([{}])

  const username = useRecoilValue(recoilName)
  const userId = useRecoilValue(recoilUserId)

  // progress loop --
  const [i, setI] = useState(1)

  useEffect(() => {
    const loop = setInterval(() => {setI((i) => i + 1)}, 100)
    return () => clearInterval(loop)
  }, []);
  // -- // progress loop end

  useEffect(() => {
    username && appointmentList(date)
      .then(res => {
        attendList(res.data[0]?.date?.date.start, username)
          .then((res2) => {
            const appointments = res.data.map((appointment) => {
              appointment.reserved = res2.data.filter((attend) => attend.appointment_id.relation[0].id === appointment.id).length
              appointment.attendId = res2.data.filter((attend) => attend.appointment_id.relation[0].id === appointment.id)[0]?.id
              return appointment
            })

            setAppointments(appointments)

          })
      })
  }, [date, username])

  const getStateElement = useCallback(
    (state) => {
      switch (state){
        case 'gathering':
          return (<span className="badge badge-warning">모집중</span>)
        default:
          return (<span></span>)
      }
    }, []);

  const handleAttend = (appointment, isReserved, attendId = null) => {
    if(isReserved) {
      cancelAttend(attendId)
        .then(res => {
          const id = appointments.findIndex((a) => a.id === appointment.id)
          const newAppointments = [...appointments]
          newAppointments[id].reserved = false
          setAppointments(newAppointments)
        })
    } else {
      attend(appointment, username, userId)
        .then((res) => {
          const id = appointments.findIndex((a) => a.id === appointment.id)
          const newAppointments = [...appointments]
          newAppointments[id].reserved = true
          setAppointments(newAppointments)
        })
    }
  }

  return (<div className="max-w-[430px] mx-auto">
    <table className="table table-zebra text-center">
      <thead>
        <tr>
          <th>type/date</th>
          <th>place/price</th>
          <th>state/attend</th>
          <th>paid by me</th>
        </tr>
      </thead>
      <tbody>
      {
        (appointments && username) ? appointments.map((appointment, idx) =>
          <tr key={idx}>
            <td>{appointment?.type?.select?.name} <br /> {appointment?.date?.date?.start}</td>
            <td>{appointment?.place?.rich_text[0]?.plain_text ?? <progress value={i % 10} max="10" />} <br /> {appointment?.price?.number}</td>
            <td>{getStateElement(appointment?.state?.select?.name)} <br />
              {(appointment.id && appointment?.state?.select?.name === 'gathering') &&
                <button onClick={() => {
                  handleAttend(appointment, appointment.reserved, appointment.attendId)
                }}>
                  { appointment.reserved ? <span className="badge badge-error">취소</span> : <span className="badge badge-info">참석</span> }
                </button>
              }
            </td>
            <td>
              {appointment.id && <Paid userId={userId} appointmentId={appointment.id}></Paid>}
            </td>
          </tr>
        ) : <tr>
          <td></td>
          <td colSpan='2'><progress value={i % 10} max="10" /></td>
          <td></td>
        </tr>
      }
      </tbody>
    </table>
  </div>)
}