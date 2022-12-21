import { connection } from "../database/db.js";
import { nanoid } from "nanoid";

export async function postUrlsShorten(req, res) {
  const token = req.headers;
  const url = res.locals.url;
  url.id = nanoid();
  const shortUrl = url.id;
  try {
    const { userId } = await connection.query(
      `SELECT users.id,token FROM users JOIN sessions ON "userId"=users.id WHERE token=$1`,
      [token]
    );
    await connection.query(
      `INSERT INTO urls (userId,url,shortUrl) VALUES ($1,$2,$3);`,
      [userId, url, shortUrl]
    );
    res.status(201).send(shortUrl);
  } catch (err) {
    console.log(err);
  }
}

export async function getUrlsId(req, res) {
  const { id } = req.params;

  try {
    const url = await connection.query(
      `SELECT id, url, shortUrl FROM urls WHERE id = $1;`,
      [id]
    );
    if (!url.shortUrl) {
      return res.sendStatus(404);
    }
    res.status(200).send(rows);
  } catch (err) {
    console.log(err);
  }
}

export async function getShortUrl(req, res) {
  const shortUrl = req.params;
  try {
    const url = await connection.query(
      `SELECT urls.id FROM urls WHERE shortUrl = $1;`,
      [shortUrl]
    );
    if (!url.rows) {
      return res.sendStatus(404);
    }
  } catch (err) {
    console.log(err);
  }
  res.redirect(`/urls/:id`);
}

export async function deleteUrls(req, res) {
  const { id } = req.params;
  const token = req.headers;
  
  await connection.query(`DELETE FROM urls WHERE urls.id=$1;`,[id])
  res.sendStatus(204)

}
