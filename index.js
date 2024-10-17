import express from "express"
import mongoose from "mongoose";
import cookieParser from "cookie-parser"
import fileUpload from 'express-fileupload';

import { DATABASE,WEB_CACHE, PORT,MAX_JSON_SIZE,URL_ENCODE } from "./app/config/config.js";
import router from "./app/routes/routes.js"

const app=express();
app.use(cookieParser());
app.use(fileUpload());
//App Use Default Middleware
app.use(express.json({limit:MAX_JSON_SIZE}));
app.use(express.urlencoded({extended:URL_ENCODE}));



//cache
app.set('etag',WEB_CACHE);

//Database Connect
mongoose.connect(DATABASE,{autoIndex:true}).then(()=>{
    console.log("MongoDB connected");
}).catch(()=>{
    console.log("MongoDB disconnected");
})

app.use("/api",router);
app.listen(PORT,()=>{
    console.log("app run success");
})