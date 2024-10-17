import {registrationService,LoginService,profileReadServices,profileUpdateService,logoutService} from "../service/userservice.js"
export const registrationController=async(req,res)=>{
    let data=await registrationService(req)
    res.json(data);
}
export const LoginController=async(req,res)=>{
    let data=await LoginService(req,res)
    res.json(data);
}
export const profileUpdateController=async(req,res)=>{
    let data=await profileUpdateService(req);
   return  res.json(data);
}
export const profileReadController=async(req,res)=>{
    let data=await profileReadServices(req)
    res.json(data);
}
export const logout=async(req,res)=>{
    let data = await logoutService(res)
    res.json(data);
}