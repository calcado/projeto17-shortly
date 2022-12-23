import { connection } from "../database/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

export async function postSignUp(req, res) {
  const { name, email, password} = res.locals.user;
  const passwordHash = bcrypt.hashSync(password, 10);
  try {
    await connection.query(
      "INSERT INTO users (name,email,password) VALUES ($1,$2,$3);",
      [name, email, passwordHash]
    );
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
  }
}

export async function postSignIn(req, res) {
  
  const id =  res.locals.id 
  console.log(id)
  
 const dados = {userId : id}
  const key = process.env.JWT_SECRET;
  console.log(key)
  const config = { expiresIn: 60 * 60 * 24 * 30 };
  console.log(config)
  const token = jwt.sign(dados, key, config);
  console.log(token)    
  
  res.status(200).send(token);
 }
