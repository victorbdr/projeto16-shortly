import joi from "joi";

const linkSchema = joi.object({
  url: joi
    .string()
    .regex(
      /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/
    )
    .required(),
});

export { linkSchema };
