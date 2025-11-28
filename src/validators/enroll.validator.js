import Joi from "joi";
export const enrollValidator = Joi.object({
  courseId: Joi.number().positive().required(),
});
