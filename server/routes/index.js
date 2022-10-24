import Router from 'koa-router'
import notion from "../services/notion.js";
import auth from "../services/auth.js";

const router = new Router();

router.get('/',(ctx, next) => {
  ctx.body = 'home'
})

router.post('/api/notion-post', notion.post)
router.get('/api/notion-show', notion.show)
router.get('/api/notion-show-ends', notion.showEnds)
router.delete('/api/notion-delete', notion.deleteById)

router.post('/api/login', auth.login)

export default router