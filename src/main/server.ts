import 'module-alias/register'

import { env } from '@/main/config'
import { MongoHelper } from '@/infra/db/mongodb/helpers'

const mongoHelper = MongoHelper.getInstance()

mongoHelper.connect(env.mongoUrl)
  .then(async() => {
    const { setupApp } = await import('./config')
    const app = await setupApp()
    app.listen(env.port, () => { console.log(`Server running at http://localhost:${env.port}`) })
  })
  .catch(console.error)
