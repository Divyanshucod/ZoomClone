import express from "express";
import { mainRouter } from "./mainRouter";
import { createPeerServer } from "./peerjs-connection";
import cors from 'cors'
const App = express()
App.use(express.json())
App.use(cors())
export const peerserver = createPeerServer(App)
App.use('/api/v1',mainRouter);


App.listen(3000,()=>{
    console.log('connected to server!');
})