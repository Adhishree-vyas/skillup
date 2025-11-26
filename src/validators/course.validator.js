import Joi from "joi";

export const createCourseValidator = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(10).required(),
  price: Joi.number().positive().required(),
  category: Joi.string().min(5).max(100).required(),
  thumbnail: Joi.string().optional(),
});


export const updateCourseValidator = Joi.object({
  title: Joi.string().min(2).max(50).optional(),
  description: Joi.string().min(6).optional(),
  price: Joi.number().positive().optional(),
  category: Joi.string().optional(),
}).min(1);
