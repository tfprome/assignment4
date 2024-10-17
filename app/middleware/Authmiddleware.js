import { tokenDecoded } from "../utility/tokenUtility.js";
export default async (req,res,next)=>{
    let token=req.cookies.Token;
    let check=tokenDecoded(token);
    if(check!=null){
        let options={
                maxAge:30*24*60*60*1000,
                httpOnly:true,
                sameSite:"none",
                secure:true,

        };
        res.cookie("Token",check.refreshtoken,options);
        let email=check.email;
        req.headers.email=email;
        next()
    }
    else{
        res.send("unauthorized").status(400)
    }
}