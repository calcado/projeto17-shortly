import { connection } from "../database/db";

export async function getUser(req, res) {
  const token = req.headers;
  try {
    const {rows} = await connection.query(`SELECT * FROM users JOIN urls ON users.id= urls."userId" WHERE users.token=$1;`,[token]);

    res.status(201).send(rows);
  } catch (err) {
    console.log(err);
  }
}

export async function getRanking(req, res) {
  try {
  } catch (err) {
    console.log(err);
  }
}
