import express from "express"
import mongoose from "mongoose";
import * as userController from "../controllers/usercontroller.js"
import Authmiddleware from "../middleware/Authmiddleware.js"
import * as file from "../../File/file.js";
let router=express.Router()

router.post("/registration",userController.registrationController)
router.post("/login",userController.LoginController)
router.post("/profileUpdate",Authmiddleware,userController.profileUpdateController)
router.get("/profileRead",Authmiddleware,userController.profileReadController)
router.get("/logout",Authmiddleware,userController.logout)


router.post("/fileUpload",file.fileupload)
router.get("/fileRead/:filename",file.fileRead)
router.get("/fileDelete/:filename",file.fileDelete)



export default router;