import Joi from "joi";

export const registerSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .pattern(/^[A-Za-z ]+$/)
    .required()
    .messages({
      "string.pattern.base": "Name must contain only alphabets",
    }),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid("Student", "Instructor", "Admin").required(),
});
export const updateProfileSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(50)
    .pattern(/^[A-Za-z ]+$/)
    .optional(),
  password: Joi.string().min(6).optional(),
}).unknown(true);
