import {useCallback, useEffect, useState} from "react";
import {appointmentList, attend, attendList, cancelAttend} from "@/apis/index.js";
import {useRecoilValue} from "recoil";
import {recoilName, recoilUserId} from "@/store/auth.js";

export default ({date}) => {
  const [appointments, setAppointments] = useState([{}])

  const username = useRecoilValue(recoilName)
  const userId = useRecoilValue(recoilUserId)

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
          return (<span className="badge badge-error">없음</span>)
      }
    }, []);

  const handleAttend = (appointment, isReserved, attendId = null) => {
    if(isReserved) {
      cancelAttend(attendId)
        .then(res => {
          console.log('TODO: 이제 해야 합니다.')
        })
    } else {
      attend(appointment, username, userId)
        .then((res) => {
          console.log('TODO: 이제 해야 합니다.')
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
        </tr>
      </thead>
      <tbody>
      {
        (appointments && username) ? appointments.map((appointment, idx) =>
          <tr key={idx}>
            <td>{appointment?.type?.select?.name} <br /> {appointment?.date?.date?.start}</td>
            <td>{appointment?.place?.rich_text[0]?.plain_text ?? 'loading'} <br /> {appointment?.price?.number}</td>
            <td>{getStateElement(appointment?.state?.select?.name)} <br />
              {appointment.id &&
                <button onClick={() => {
                  handleAttend(appointment, appointment.reserved, appointment.attendId)
                }}>
                  { (appointment.reserved ? <span className="badge badge-error">취소</span> : <span className="badge badge-info">참석</span>) }
                </button>
              }
            </td>
          </tr>
        ) : <tr>
          <td></td>
          <td>loading</td>
          <td></td>
        </tr>
      }
      </tbody>
    </table>
  </div>)
}