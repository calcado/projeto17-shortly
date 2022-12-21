import { signUpSchema } from "../models/signUpSchema.js";
import { signInSchema } from "../models/signInSchema.js";
import { connection } from "../database/db.js";

export async function signUpValidation(req, res, next) {
  const { name, email, password, confirmPassword } = req.body;
  const { error } = signUpSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const errors = error.map((details) => details.message);
    return res.status(422).send(errors);
  }
  try {
    const { rows } = connection.query("SELECT * users WHERE name = $1;", [name]);
    if (rows.length > 0) {
      return res.sendStatus(409);
    }
  } catch (err) {
    console.log(err);
  }

  res.locals.user = { name, email, password, confirmPassword };
  next();
}

export async function signInValidation(req, res, next) {
const {email,password} = req.body
try{

const {error} = signInSchema.validate(req.body,{abortEarly: false})
if(error){
    const errors = erros.map((details)=>details.message)
    res.status(422).send(errors)
}
const user = await connection.query(
  "SELECT * FROM users WHERE email=$1 AND password=$2;",
  [email, password]
)
if(!user && bcrypt.compareSync(password,user.password)){
  return res.sendStatus(401)
}

}catch(err){console.log(err)}
res.locals.login = {email,password}
next();
}
