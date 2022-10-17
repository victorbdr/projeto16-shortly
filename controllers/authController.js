import db from "../db/db.js";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";

async function signUp(req, res) {
    const { name, email, password } = req.body;
    const hashPassword = bcrypt.hashSync(password, 10);

  try {
    const newUser = await db.query("SELECT * FROM users WHERE email=$1", [email]);
    if (newUser.rowCount > 0) {
       res.sendStatus(409);
       return
    }
    await db.query(
      `INSERT INTO users(name, email, password) VALUES ($1,$2,$3)`,
      [name, email, hashPassword]
    );
    res.sendStatus(201);
    return;
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
async function signIn(req, res) {
  const {email, password}= req.body;
  try {
    const newSession = await db.query("SELECT * FROM users WHERE email=$1", [
      email,
    ]);
    if(newSession.rows[0] && bcrypt.compareSync(password, newSession.rows[0].password )){
        const token = uuid()
        await db.query(`INSERT INTO sessions ("userId", token) VALUES ($1,$2)`,[newSession.rows[0].id, token])
       return res.send(token).status(200)
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
export {signIn,signUp}
