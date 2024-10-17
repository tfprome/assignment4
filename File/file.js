import fs from "fs"
import path from "path"
import multer from "multer"
import {dirname}from 'path'
import {fileURLToPath} from "url"

const __filename=fileURLToPath(import.meta.url)
const __dirname=dirname(__filename);
export const fileupload=async(req,res)=>{
    try{
        const uploadFile=req.files.file;

        const uploadPath=path.join(__dirname,"uploadsFile",uploadFile.name);
        await uploadFile.mv(uploadPath,(e)=>{
            if(e){
                res.json({data:e.toString()})
            }
            else{
                res.json({status:"success",data:"upload file success"})
            }
        })
    }catch(e){
        res.json({status:"fail",data:e.toString()})
    }
}
export const fileRead=async(req,res)=>{
    try{
        let filename=req.params.filename;
        const filePath=path.join(__dirname,"/uploadsFile/",filename);
        res.sendFile(filePath)
    }catch(e){
        res.json({status:"fail",data:e.toString()})

    }
}
export const fileDelete=async(req,res)=>{
    try{
        let filename=req.params.filename;
        const filePath=path.join(__dirname,"uploadsFile",filename);
        fs.unlink(filePath,(e)=>{
            if(e){
                res.json({data:e.toString()})
            }
            else{
                res.json({status:"success",data:"file successfully deleted"})
            }
        })

    }catch(e){
        res.json({status:"fail",data:e.toString()})

    }
}