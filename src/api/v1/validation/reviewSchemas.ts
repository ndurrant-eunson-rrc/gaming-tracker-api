import Joi from "joi";

/**
 * @openapi
 * components:
 *   schemas:
 *     Review:
 *       type: object
 *       required: [gameTitle, score, body]
 *       properties:
 *         id:
 *           type: string
 *         gameTitle:
 *           type: string
 *           example: "Final Fantasy IX"
 *         score:
 *           type: number
 *           minimum: 0
 *           maximum: 10
 *           example: 8
 *         review:
 *           type: string
 *           example: "absolute masterpiece obviously"
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */
export const reviewSchemas = {
  create: {
    body: Joi.object({
      gameTitle: Joi.string().required().messages({
        "any.required": "Game title is required",
        "string.empty": "Game title cannot be empty",
      }),
      score: Joi.number().min(0).max(10).required().messages({
        "any.required": "Score is required",
        "number.min": "Score must be at least 0",
        "number.max": "Score cannot exceed 10",
      }),
      review: Joi.string().required().messages({
        "any.required": "Review body is required",
        "string.empty": "Review body cannot be empty",
      }),
    }),
  },
  update: {
    params: Joi.object({ id: Joi.string().required() }),
    body: Joi.object({
      gameTitle: Joi.string().required().messages({
        "any.required": "Game title is required",
        "string.empty": "Game title cannot be empty",
      }),
      score: Joi.number().min(1).max(10).optional(),
      review: Joi.string().optional(),
    }),
  },
  getById: {
    params: Joi.object({ id: Joi.string().required() }),
  },
  delete: {
    params: Joi.object({ id: Joi.string().required() }),
  },
};