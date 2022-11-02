import {post, show, showEnds, deleteById, patchById} from "../external/index.js";

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
    const {db, primary, rest} = ctx.request.query

    const data = {
      db, primary,
      ...JSON.parse(rest)
    }

    await show(data)
      .then((res) => {
        ctx.status = 200
        ctx.body = res?.data?.results[0]?.properties
      }).catch((e) => {
        console.dir(e.response.data)
        ctx.status = e.response.data.status
        ctx.body = e.response.data.message
      })
  },

  async showEnds(ctx) {
    await showEnds(ctx.request.query)
      .then((res) => {
        ctx.status = 200
        ctx.body = res?.data?.results?.map((r) => {
          r.properties.id = r.id
          return r.properties
        })
      }).catch((e) => {
        console.dir(e.response?.data)
        ctx.status = e.response.data.status
        ctx.body = e.response.data.message
      })
  },

  async deleteById(ctx) {
    await deleteById(ctx.request.body)
      .then(res => {
        ctx.status = 204;
        ctx.body = {
          'message': 'successfully deleted'
        }
      }).catch(e => {
        console.dir(e.response?.data)
        ctx.status = e.response.data.status
        ctx.body = e.response.data.message
      })
  },

  async patchById(ctx) {
    console.log(ctx.request.body)
    await patchById(ctx.request.body)
      .then(res => {
        ctx.status = 200;
        ctx.body = {
          'message': 'successfully updated'
        }
      }).catch(e => {
        console.dir(e.response?.data)
        ctx.status = e.response.data.status
        ctx.body = e.response.data.message
      })
  },
}