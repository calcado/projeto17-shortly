import { connection } from "../database/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

export async function postSignUp(req, res) {
  const { name, email, password, confirmPassword } = res.body;
  const passwordHash = bcrypt.hashSync(password, 10);
  try {
    await connection.query(
      "INSERT INTO users (name,email,password,confirmPassword) VALUES ($1,$2,$3,$4);",
      [name, email, passwordHash, confirmPassword]
    );
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
  }
}

export async function postSignIn(req, res) {
  const user = res.locals.login;
  const key = process.env.JWT_SECRET;
  const config = { expiresIn: 60 * 60 * 24 * 30 };
  const token = jwt.sign((user, key, config));
  try {
    const {id} = await connection.query(`SELECT users.id FROM users WHERE email=$1`,[user.email])
    await connection.query(`INSERT INTO sessions ("userId",token) VALUES($1,$2);`,[id,token])
    res.status(200).send(token);
  } catch (err) {
    console.log(err);
  }
}
