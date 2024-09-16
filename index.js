import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import {Server} from 'socket.io'
import http from 'http'
import { mysql } from './services/mySqlDb.js'

import userRouter from './routes/userRoutes.js'
import Printroute from './routes/printRouter.js'
import { thermalprintServer } from './services/Socket_Io_Sever.js'


dotenv.config()

const port = process.env.PORT || 3002
const app= express()
const servrer = http.createServer(app)
const io = new Server(servrer,{
    cors:{
        origin:"*",
        methods:["GET","POST"],
    },
})

io.on("connection",async(socket)=>{
    console.log("server io ",socket.id)
   await thermalprintServer(socket ,io)
})

app.use(express.json());
app.use(cors());
app.use('/',userRouter)
app.use('/api',Printroute)

servrer.listen(port,()=>{
    console.log(`Server Runnig at = localhost${port}` )
})