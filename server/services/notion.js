import {post, show} from "../external/index.js";

export default {
  async post(ctx) {
    await post(ctx.request.body)
      .then((res) => {
        ctx.status = 200
        ctx.body = res.data
      }).catch((e) => {
        console.dir(e.response.data)
        ctx.status = e.response.data.status
        ctx.body = e.response.data.message
      })
  },

  async show(ctx) {
    await show(ctx.request.query)
      .then((res) => {
        ctx.status = 200
        ctx.body = res?.data?.results[0]?.properties
      }).catch((e) => {
        console.dir(e.response.data)
        ctx.status = e.response.data.status
        ctx.body = e.response.data.message
      })
  }
}