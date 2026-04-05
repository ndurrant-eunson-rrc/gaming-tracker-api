import Joi from "joi";

/**
 * @openapi
 * components:
 *   schemas:
 *     BacklogEntry:
 *       type: object
 *       required: [title, genre, platform, status]
 *       properties:
 *         id:
 *           type: string
 *         title:
 *           type: string
 *           example: "Final Fantasy IX"
 *         genre:
 *           type: string
 *           example: "JRPG"
 *         platform:
 *           type: string
 *           example: "Steam"
 *         franchise:
 *           type: string
 *           example: "Final Fantasy"
 *         status:
 *           type: string
 *           enum: [want_to_play, playing, completed]
 *         rating:
 *           type: number
 *           minimum: 1
 *           maximum: 10
 *         notes:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */
export const entrySchemas = {
    create: {
        body: Joi.object({
            title: Joi.string().required().messages({
                "any.required": "Title is required",
                "string.empty": "Title cannot be empty",
            }),
            genre: Joi.string().required().messages({
                "any.required": "Genre is required",
                "string.empty": "Genre cannot be empty",
            }),
            platform: Joi.string().required().messages({
                "any.required": "Platform is required",
                "string.empty": "Platform cannot be empty",
            }),
            franchise: Joi.string().optional(),
            status: Joi.string()
                .valid("want_to_play", "playing", "completed")
                .required()
                .messages({
                    "any.required": "Status is required",
                    "any.only": "Status must be want_to_play, playing, or completed",
                }),
            rating: Joi.number().min(1).max(10).optional(),
            notes: Joi.string().optional(),
        }),
    },
    update: {
        params: Joi.object({ id: Joi.string().required() }),
        body: Joi.object({
            title: Joi.string().optional(),
            genre: Joi.string().optional(),
            platform: Joi.string().optional(),
            franchise: Joi.string().optional(),
            status: Joi.string().valid("want_to_play", "playing", "completed").optional(),
            rating: Joi.number().min(1).max(10).optional(),
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