import {showWhere} from "../external/index.js";
import btoa from 'btoa'
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

export default {
  async login(ctx){
    await showWhere({
      db: ctx.request.body.db,
      primary: ctx.request.body.nickname,
      secret_code: { type: 'string', content: ctx.request.body.code }
    }).then(res => {
      if(res.data?.results[0]?.properties) {
        dayjs.extend(utc)
        dayjs.extend(timezone)

        ctx.status = 200
        ctx.body = {
          id: res?.data?.results[0].id,
          token: btoa(`${ctx.request.body.nickname}.${process.env.VITE_SALT}.${res?.data?.results[0].id}.${dayjs().tz("Asia/Seoul").add(30, 'minutes').format('YYYY-MM-DDTHH:mm:ss')}`),
          name:  res.data?.results[0]?.properties.realname.rich_text[0].plain_text,
        }
      } else {
        ctx.status = 401
        ctx.body = 'wrong nickname or code'
      }
    })
  },
}