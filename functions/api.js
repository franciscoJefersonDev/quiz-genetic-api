// import express from 'express'
// import cors from 'cors'
// import ServerlessHttp from 'serverless-http'
// import router
//  from './routes'
// const app = express()
// app.use(cors())
// app.use(express.json())
// app.use('./netlify/functions/api', router)
// module.exports.handler = ServerlessHttp(app)
const express = require('express')
const cors = require('cors')
const ServerlessHttp = require('serverless-http')

const app = express()
const router = require('./routes')

app.use(cors())
app.use(express.json())
app.use('/.netlify/functions/api', router)
module.exports.handler = ServerlessHttp(app)



