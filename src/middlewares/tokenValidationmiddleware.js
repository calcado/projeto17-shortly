import { connection } from "../database/db.js";
import jwt from "jsonwebtoken"

export async function tokenValidation (req,res,next){
    
    const { authorization } = req.headers;
    
    const token = authorization?.replace("Bearer ", "");
    
    if (!token) {
       
      return res.sendStatus(401);
    }
    
    try{
    jwt.verify(token, process.env.JWT_SECRET, async (error, decoded) =>{

        if(error){
        return res.sendStatus(401)
        }

        const {userId} = decoded
        const userExist = await connection.query("SELECT * FROM users WHERE id=$1;",[userId])
        
        if(userExist.rows.length === 0){
            return res.sendStatus(401)
        }
       
        res.locals.user = userId;
        return next();
    })    
    
    }catch(err){
        console.log(err)
    }


}