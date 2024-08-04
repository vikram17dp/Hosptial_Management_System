import { config } from 'dotenv';
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import { dbConnection } from './database/dsconnection.js';
import messagerouter from './router/messagerouter.js'
import {errorMidlleware} from './middlewares/errormiddleware.js'

const app = express();
app.use(cors(
    {
        origin:[process.env.FRONTEND_URL,process.env.DASHBOARD_URL],
        methods:["GET","PUT","DELETE","POST"],
        credentials:true
    }
))
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:'/tmp/'
}));

config({path:"./config/config.env"});

app.use('/api/v1/message',messagerouter);
dbConnection();
app.use(errorMidlleware);

export default app;