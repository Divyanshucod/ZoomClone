import express from "express";
import { mainRouter } from "./mainRouter";

const App = express()
App.use(express.json())

App.use('/api/v1',mainRouter);


App.listen(3000,()=>{
    console.log('connected to server!');
})