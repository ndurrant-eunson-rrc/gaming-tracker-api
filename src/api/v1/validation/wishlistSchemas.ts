import Joi from "joi";

/**
 * @openapi
 * components:
 *   schemas:
 *     Wishlist:
 *       type: object
 *       required: [gameTitle, priority]
 *       properties:
 *         id:
 *           type: string
 *         gameTitle:
 *           type: string
 *           example: "Hollow Knight"
 *         priority:
 *           type: string
 *           enum: [low, medium, high]
 *           example: "high"
 *         notes:
 *           type: string
 *           example: "On sale during summer"
 *         addedAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */
export const wishlistSchemas = {
    create: {
        body: Joi.object({
            gameTitle: Joi.string().required().messages({
                "any.required": "Game title is required",
                "string.empty": "Game title cannot be empty",
            }),
            priority: Joi.string()
                .valid("low", "medium", "high")
                .required()
                .messages({
                    "any.required": "Priority is required",
                    "any.only": "Priority must be low, medium, or high",
                }),
            notes: Joi.string().optional(),
        }),
    },
    update: {
        params: Joi.object({ id: Joi.string().required() }),
        body: Joi.object({
            gameTitle: Joi.string().optional(),
            priority: Joi.string().valid("low", "medium", "high").optional(),
            notes: Joi.string().optional(),
        }),
    },
    getById: {
        params: Joi.object({ id: Joi.string().required() }),
    },
    delete: {
        params: Joi.object({ id: Joi.string().required() }),
    },
};