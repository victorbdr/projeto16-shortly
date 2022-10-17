import { nanoid } from "nanoid";
import db from "../db/db.js";

async function linkShortener(req, res) {
  const { url } = req.body;
  const { userId } = res.locals;
  const shortUrl = nanoid(7);

  try {
    const shorter = await db.query(
      `INSERT INTO links ("userId", url, "shortUrl") VALUES ($1, $2, $3)`,
      [userId, url, shortUrl]
    );
    res.send({ shortUrl }).status(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

async function getRequestedLink(req, res) {
  const { id } = req.params;

  try {
    const requestedLink = await db.query(
      `SELECT id, "shortUrl", url FROM links WHERE "userId" = $1`,
      [id]
    );
    const link = requestedLink.rows[0];
    if (!link) {
      return res.sendStatus(404);
    }
    res.send(link).status(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

async function urlRedirect(req, res) {
  const { shortUrl } = req.params;
  try {
    const shortLink = await db.query(
      `SELECT * FROM links WHERE "shortUrl" = $1`,
      [shortUrl]
    );

    if (!shortLink.rows[0]) {
      console.log(shortLink.rows[0]);
      return res.sendStatus(404);
    }

    const countVisit = await db.query(
      `UPDATE links SET "visitCount" = "visitCount" + 1 WHERE "shortUrl" = $1`,
      [shortUrl]
    );
    const redirectlink = shortLink.rows[0].url;
    res.redirect(redirectlink);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
async function deletOption(req, res) {
  const { id } = req.params;
  const { userId } = res.locals;
  try {
    const deleteLink = await db.query(`SELECT * FROM links WHERE id = $1`, [
      id,
    ]);
    if (!deleteLink.rows.length) {
      return res.sendStatus(404);
    }
    if (deleteLink.rows[0].userId !== userId) {
      return res.sendStatus(401);
    }
    await db.query(`DELETE FROM links WHERE id=$1 AND "userId"=$2`, [
      id,
      userId,
    ]);
    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export { linkShortener, getRequestedLink, urlRedirect, deletOption };
