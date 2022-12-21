import { connection } from "../database/db.js";
import { nanoid } from "nanoid";

export async function postUrlsShorten(req,res){
const token = req.headers;
const url = res.locals.url
url.id = nanoid();
const shortUrl = url.id
try{
const {userId} = await connection.query(`SELECT users.id,token FROM users JOIN sessions ON "userId"=users.id WHERE token=$1`,[token]) 
await connection.query(`INSERT INTO urls (userId,url,shortUrl) VALUES ($1,$2,$3);`,[userId,url,shortUrl])
res.status(201).send(shortUrl)    
}catch(err){
    console.log(err)}

}

export async function getUrlsId(req,res){
const {id} = req.params;

try{
const {rows} = await connection.query(`SELECT urls.id, urls.url, urls.shortUrl FROM urls WHERE "userdId" = $1;`,[id])
res.status(200).send(rows)    
}catch(err){
    console.log(err)}
}

export async function getShortUrl(req,res){
const shortUrl = req.params
try{
const url = await connection.query(`SELECT * FROM urls WHERE shortUrl = $1;`,[shortUrl]);
if(!url){
return res.sendStatus(404)    
}    
}catch(err){console.log(err)}
res.redirect()    
}




export async function deleteUrls(req,res){
const {id} = req.params
const token = req.headers




}