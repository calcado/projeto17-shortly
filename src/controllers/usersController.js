import { connection } from "../database/db.js";

export async function getUser(req, res) {
  const userId = res.locals.user;
  try {
    const user = await connection.query(`SELECT users.id, users.name, SUM(urls."visitCount") AS "visitCount", 
    JSON_AGG(JSON_BUILD_OBJECT('id', urls.id, 'shortUrl', urls."shortUrl", 'url', urls.url, 'visitCount', urls."visitCount")) AS "shortenedUrls" 
    FROM users 
    JOIN urls ON urls."userId"=users.id 
    WHERE users.id=$1 GROUP BY users.id;`,
[userId]
);
    res.status(201).send(user.rows[0]);
  } catch (err) {
    console.log(err);
  }
}


export async function getRanking(req, res) {
 
  try {
    const {rows} = await connection.query(`SELECT users.id, users.name, 
    COUNT(urls."shortUrl") AS "linksCount",
    SUM(COALESCE(urls."visitCount",0)) AS "visitCount" 
    FROM users 
    LEFT JOIN urls ON urls."userId"=users.id 
    GROUP BY users.id ORDER BY "visitCount" DESC LIMIT 10`)
    console.log(rows)
    res.status(200).send(rows)
  } catch (err) {
    console.log(err);
  }
}
