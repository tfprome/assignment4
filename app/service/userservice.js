import UserModel from "../model/usermodel.js";
import tokenEncoded from "../utility/tokenUtility.js"

export const registrationService=async(req)=>{
    try{
        let reqBody=req.body;
        await UserModel.create(reqBody);
        return{status:"success",data:"Resistration successful"}
    }
    catch(e){
        return {status:"fail",data:e.toString()}
    }
}
export const LoginService=async(req,res)=>{
    try{
        let reqBody=req.body;
        let email=reqBody.email;
        let password=reqBody.password;
        let matchStage={$match:{email:email,password:password}}
        let project={$project:{
            _id:1,
            email:1
        }
           
        }
        let data=await UserModel.aggregate([
            matchStage,
            project
        ])
        if(data.length!=0){
            let token=tokenEncoded(data[0]["email"])

            let options={
                maxAge:30*24*60*60*1000,
                httpOnly:true,
                sameSite:"none",
                secure:true,

            };
            res.cookie("Token",token,options);

            return{status:"success",data:data[0],token:token}
        }
        else{
            return{status:"fail",data:"wrong password"}
        }
        

    }catch(e){
        return{status:"fail",data:e.toString()}
    }
}
export const profileReadServices=async(req)=>{
    try{
        let email=req.headers.email;
        let data=await UserModel.find({email:email});
        return {status:"success",data:data}

    }catch(e){
        return{status:"fail",data:e.toString()}
    }
}
export const profileUpdateService=async(req)=>{
   try{
    let reqBody=req.body
    let email=req.headers.email;
    await UserModel.updateOne({email:email},{$set:reqBody},{upsert:true})
    return {status:"success",data:"profileSuccessfully updated"}
   }
   catch(e){
    return{status:"fail",data:e.toString()}
   }
}
export const logoutService=async(res)=>{
    try{
        res.clearCookie("Token");
        return{status:"success",data:"Logout"}
    }catch(e){
        return {status:"fail",data:e.toString()}
    }
}