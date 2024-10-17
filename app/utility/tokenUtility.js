import { JWT_KEY,JWT_EXPIRE_TIME } from "../config/config.js";
import jwt from "jsonwebtoken";
 const tokenEncoded=(email)=>{
    let key=JWT_KEY;
    let expire=JWT_EXPIRE_TIME;
    let payload={email};
    return jwt.sign(payload,key,{expiresIn:expire});
}
export const tokenDecoded=(token)=>{
    try{
        let KEY=JWT_KEY;
        let expire=JWT_EXPIRE_TIME
        let decode= jwt.verify(token,KEY)
       
            let refreshtoken=jwt.sign({email:decode.email},KEY,{expiresIn:expire})
            return {refreshtoken,email:decode.email}

    }
    catch{
        return null;
    }
}
export default tokenEncoded;