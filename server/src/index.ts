import express from 'express'
import bodyParser from 'body-parser'
import auth from './controllers/auth.controller'
import news from './controllers/news.controller'
import user from './controllers/user.controller'
import admin from './controllers/admin.controller'
const app = express()
const cors = require('cors');
const jsonParser = bodyParser.json()
import Storage from './services/storage'
import swaggerUi from 'swagger-ui-express'
import {swaggerDocument} from './swagger'

const port = 3000

Storage.init()

app.use(cors({origin: '*'}));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/auth', jsonParser, auth)

app.use('/news', jsonParser, news)

app.use('/user', jsonParser, user)

app.use('/admin', jsonParser, admin)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

