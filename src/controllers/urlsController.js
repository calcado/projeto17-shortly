import { connection } from "../database/db.js";
import { nanoid } from "nanoid";

export async function postUrlsShorten(req, res) {
  console.log(res.locals.user)
  const userId = res.locals.user;
  
  const url = res.locals.url;
  const shortUrl = nanoid(10);
  
  try {
    console.log(userId)
    await connection.query(
      `INSERT INTO urls ("userId",url,"shortUrl") VALUES ($1,$2,$3);`,
      [userId, url, shortUrl]
    );
    res.status(201).send(shortUrl);
  } catch (err) {
    console.log(err);
  }
}

export async function getUrlsId(req, res) {
  const { id } = req.params;
  console.log(id)
  try {
    const urlValid = await connection.query(
      `SELECT id, url, "shortUrl" FROM urls WHERE id = $1;`,
      [id]
    );
   

    if (urlValid.rows.length === 0) {
      return res.sendStatus(404);
    }

    res.status(200).send(urlValid.rows[0]);

  } catch (err) {
    console.log(err);
  }
}

export async function getShortUrl(req, res) {
  const { shortUrl } = req.params;

  try {
    const url = await connection.query(
      `SELECT * FROM urls WHERE "shortUrl" = $1;`,
      [shortUrl]
    );
    if (url.rows.length === 0) {
      return res.sendStatus(404);
    }
    await connection.query(
      `UPDATE urls SET "visitCount"="visitCount"+1 WHERE "shortUrl"=$1`,
      [shortUrl]
    );
    const site = url.rows[0].url;

    res.redirect(site);
  } catch (err) {
    console.log(err);
  }
}

export async function deleteUrls(req, res) {
  const { id } = req.params;
  try {
    const url = connection.query(`SELECT * FROM urls WHERE id = $1`, [id]);
    if (url.rows.length === 0) {
      return res.sendStatus(404);
    }

    await connection.query(`DELETE FROM urls WHERE urls.id=$1;`, [id]);

    res.sendStatus(204);
  } catch (err) {
    console.log(err);
  }
}
