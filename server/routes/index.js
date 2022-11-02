import Router from 'koa-router'
import notion from "../services/notion.js";
import auth from "../services/auth.js";
import payment from "../services/payment.js";

const router = new Router();

router.get('/',(ctx, next) => {
  ctx.body = 'home'
})

router.post('/api/notion-post', notion.post)
router.get('/api/notion-show', notion.show)
router.get('/api/notion-show-ends', notion.showEnds)
router.delete('/api/notion-delete', notion.deleteById)
router.patch('/api/notion-patch', notion.patchById)

router.post('/api/login', auth.login)

router.get('/api/payment', payment.myPaymentForThisMonth)

export default router