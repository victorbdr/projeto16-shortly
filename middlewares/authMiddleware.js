import db from "../db/db.js";
import { signInSchema, signUpSchema } from "../schemas/authSchema.js";

async function signInValidate(req, res, next) {
  const session = req.body;
  const validate = signInSchema.validate(session);
  if (validate.error) {
    res.sendStatus(422);
    return;
  }
  next();
}

async function signUpValidate(req, res, next) {
  const newUser = req.body;
  const validate = signUpSchema.validate(newUser);
  if (validate.error) {
    res.sendStatus(422);
    return;
  }
  next();
}

async function tokenValidate(req, res, next) {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (!token) {
      return res.sendStatus(401);
    }
    const session = await db.query(
      `SELECT "userId" FROM sessions WHERE token=$1`,
      [token]
    );

    if (!session.rows[0]) {
      return res.sendStatus(401);
    }

    const { userId } = session.rows[0];

    res.locals.userId = userId;
    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
export { signInValidate, signUpValidate, tokenValidate };
