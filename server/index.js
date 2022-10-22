import Koa from 'koa'
import cors from '@koa/cors'
import router from './routes/index.js'
import env from 'dotenv'
import bodyParser from 'koa-bodyparser'

env.config()
const app = new Koa()
app.proxy = true

app
  .use(cors({
      origin: process.env.VITE_MAIN_URL,
      credential: true,
    }))
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(4000, () => {
  console.log("====================== \n \n \n \n \n \n now running server \n \n \n \n \n \n ======================")
})
