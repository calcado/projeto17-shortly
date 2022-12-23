import { connection } from "../database/db.js";
import {urlsSchema} from "../models/urlsSchema.js"

export async function postUrlValidation(req,res,next){
    const { url } = req.body;
    
    const {error} = urlsSchema.validate({url}, {abortEarly: false})
    if(error){
    const errors = error.details.map((detail)=>detail.message)
    res.status(422).send(errors)
    }
    
    res.locals.url= url
    next();  
}


export async function deleteUrlValidation(req,res,next){
    const token = req.headers;
    const {id} = req.params
    
    if(!token){
    return res.sendStatus(401)
    }

    try{
    const user = await connection.query(`SELECT id FROM users WHERE id=$1`,[token.id])
    const url= await connection.query(`SELECT "shortUrl","userId" FROM urls WHERE id=$1;`,[id])
    
    if(!url.shortUrl){
        return res.sendStatus(404)
    }
    if(url.usersId !== user.id){
      return res.sendStatus(401)  
    }
    }catch(err){
    console.log(error)
}
next();
}