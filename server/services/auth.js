import {showWhere} from "../external/index.js";
import btoa from 'btoa'
import dayjs from "dayjs";

export default {
  async login(ctx){
    await showWhere({
      db: ctx.request.body.db,
      primary: ctx.request.body.nickname,
      secret_code: { type: 'string', content: ctx.request.body.code }
    }).then(res => {
      if(res.data?.results[0]?.properties) {
        ctx.status = 200
        ctx.body = btoa(`${ctx.request.body.nickname}.${process.env.VITE_SALT}.${ctx.request.body.code}.${dayjs().add(30, 'minutes').format('YYYY-MM-DDTHH:mm:ss')}`)
      } else {
        ctx.status = 401
        ctx.body = 'wrong nickname or code'
      }
    })
  },
}