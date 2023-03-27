import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import {  routes as usersRoutes } from './src//routes/router'
import { connection } from './src/controllers/userController'

const app = express()
app.use(cors())

//* parsing middleware 
//! parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

//! parse application/json
app.use(bodyParser.json());
//! static files
app.use(express.static('src'))
app.use('/users', usersRoutes);



const port = process.env.port || 5004


app.get('/', (req, res) => {
  const startTime = Date.now()
  connection.query('DO SLEEP(3)', (error, result) => {
    console.log(Date.now() - startTime)
  })
  res.send('we are on home page!')
})

app.listen(port, () =>
  console.log(`SERVER RUNNING ON PORT: http://localhost:${port}`),
)
