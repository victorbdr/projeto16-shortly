import db from "../db/db.js";

async function sessionData(req, res) {
  const { id } = req.params;
  try {
    const session = await db.query(
      `SELECT users.id, users.name, SUM(links."visitCount") AS "visitCount" FROM users
        LEFT JOIN links ON users.id = links."userId"
        WHERE users.id = $1
        `[id]
    );
    console.log(session);
    if (!session.rows[0]) {
      return res.sendStatus(404);
    }
    const linksData = await db.query(
      `SELECT id, "shortUrl", url, "visitCount" FROM links WHERE "userId"=$1`,
      [id]
    );
    const getData = linksData.rows;
    res.send({ ...session.rows, getData }).status(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

async function usersRank(req, res) {
  try {
    const rank =
      await db.query(`SELECT users.id, users.name, COUNT(links.url) as "linksCount", SUM(links."visitCount") AS "visitCount" FROM users 
      LEFT JOIN links ON users.id = links."userId"
      GROUP BY users.id
      ORDER BY "visitCount" DESC LIMIT 10`);
    res.send(rank.rows).status(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export { sessionData, usersRank };
