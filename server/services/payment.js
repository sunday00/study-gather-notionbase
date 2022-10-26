import {getByRangeDate} from "../external/index.js";
import dayjs from "dayjs";
import atob from 'atob'

export default {
  async myPaymentForThisMonth(ctx) {
    const month = ctx.request.query.month - 1
    const token =  (ctx.request.header.authorization.replace('Barer ', ''))
    const nick = atob(token).split('.')[0]

    const start = dayjs().set('month', month).set('date', 1).format('YYYY-MM-DD')
    const end = dayjs().set('month', month).endOf('month').format('YYYY-MM-DD')

    const appointments = await getByRangeDate(process.env.NOTION_APPOINT_DB, [start, end])
    const attends = await getByRangeDate(process.env.NOTION_ATTEND_DB, [start, end])

    // TODO:
    // appoints loop appo
    // appo id attends exist count
    // appo id -> attend.nick = nick no exists -> my price 0
    // appo id -> attend.nick = nick -> appo.price / attends count
    // loop sum -> my total this month price

    // but dinner price 0 when noshow

    ctx.status = 200
    ctx.body = attends.data
  },
}