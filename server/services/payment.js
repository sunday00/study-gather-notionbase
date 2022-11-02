import {getByRangeDate} from "../external/index.js";
import dayjs from "dayjs";
import atob from 'atob'

export default {
  async myPaymentForThisMonth(ctx) {
    const month = ctx.request.query.month - 1
    const token =  (ctx.request.header.authorization.replace('Barer ', ''))
    const id = atob(token).split('.')[2]

    const start = dayjs().set('month', month).set('date', 1).format('YYYY-MM-DD')
    const end = dayjs().set('month', month).endOf('month').format('YYYY-MM-DD')

    const appointments = await getByRangeDate(process.env.NOTION_APPOINT_DB, [start, end])
    const attends = await getByRangeDate(process.env.NOTION_ATTEND_DB, [start, end])

    const attendsList = []
    let attendItem = {
      type: '',
      date: '',
      attendsCount: 0,
      price: 0,
      me: false,
    }

    attends.data.results.forEach((att) => {
      const appointment = appointments.data.results.find(
        (a) => a.id === att.properties.appointment_id.relation[0].id
      )

      if(attendItem.date !== att.properties.date.date.start || !att.properties.id.title[0].plain_text.startsWith(attendItem.type)) {
        if(attendItem.date !== '' && attendItem.type !== '') attendsList.push({...attendItem})
        attendItem = {
          type: '',
          date: '',
          attendsCount: 0,
          price: 0,
          me: false,
        }
        attendItem.type = att.properties.id.title[0].plain_text.split('_').shift()
        attendItem.date = att.properties.date.date.start
      }

      if(attendItem.type === 'dinner' && att.properties.state.select.name === 'noshow' ) return 0

      attendItem.attendsCount++

      attendItem.price = appointment.properties.price.number

      if(attendItem.me) return 0

      attendItem.me = att.properties.user_id.relation[0].id === id
    })

    if(attendItem.date !== '') attendsList.push({...attendItem})

    const paidArray = appointments.data.results.map((a) => {
      if(a.properties.paid_user.relation[0]?.id === id) {
        return a.properties.price.number
      }

      return 0
    })

    const myPaid = paidArray.length ? paidArray.reduce((tot, cur) => tot + cur) : 0

    ctx.status = 200
    ctx.body = {attendsList, myPaid}
  },
}