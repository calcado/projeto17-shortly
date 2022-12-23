import { signUpSchema } from "../models/signUpSchema.js";
import { signInSchema } from "../models/signInSchema.js";
import { connection } from "../database/db.js";
import bcrypt from "bcrypt";

export async function signUpValidation (req, res, next) {
  const { name, email, password, confirmPassword } = req.body;
  
  const { error } = signUpSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(422).send(errors);
  }

  if (password !== confirmPassword) {
    return res.sendStatus(400);
  }

  try { 
  const { rows } = await connection.query("SELECT * FROM users WHERE email = $1;",[email]);
    if (rows.length > 0) {
      return res.sendStatus(409);
    }

  } catch (err) {
    console.log(err);
  }

  res.locals.user = { name, email, password};
  next();
}

export async function signInValidation(req, res, next) {
  
  const { email, password } = req.body;

  const { error } = signInSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const errors = error.details.map((detail) => detail.message);
    res.status(422).send(errors);
  }
  
  try {
    const user = await connection.query(`SELECT * FROM users WHERE email =$1;`,[email]);
   
    
    if (user.rows.length === 0) {
      return res.status(401).send("aqui");
    }

   
    const validation = bcrypt.compareSync(password, user.rows[0].password);
    if (!validation) {
      return res.status(401).send("esse");
    }

    const  id  = user.rows[0].id;
    console.log(id)
    res.locals.id = id;
  } catch (err) {
    console.log(err);
  }

  next();
}
