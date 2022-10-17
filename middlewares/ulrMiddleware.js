import { linkSchema} from "../schemas/linkSchema.js";

async function LinkValidation(req, res, next) {
  const url = req.body;
  const validate = linkSchema.validate(url);
  if (validate.error) {
    res.sendStatus(422);
    return
  }
  next();
}

export {LinkValidation}
