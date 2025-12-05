import Joi from "joi";

export const addReviewValidator = Joi.object({
  courseId: Joi.number().positive().required(),
  rating: Joi.number().positive().optional(),
  comment: Joi.string().min(2).optional(),
});
export const updateCourseValidator = Joi.object({
  rating: Joi.string().min(2).max(50).optional(),
  comment: Joi.string().min(6).optional(),
}).min(1);
