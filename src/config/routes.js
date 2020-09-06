import { Router } from '@beyonk/sapper-rbac'

const routes = new Router()
  .restrict('/admin.*', ['admin'])
  .restrict('/organisation.*', ['owner'])
  .restrict('/profile.*', ['admin', 'contributor', 'moderator', 'subscriber', 'user'])
  .restrict('/api/content.*', ['admin'])
  .unrestrict('/.*') // add this after the guarded sub-urls
  .build()

export default routes
