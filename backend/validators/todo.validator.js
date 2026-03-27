const Joi = require("joi");

const createTodoSchema = Joi.object({
  title: Joi.string().min(3).max(50).required(),
  description: Joi.string().allow("").optional(),
  status: Joi.string().valid("pending", "completed").optional(),
  attachments: Joi.array()
    .items(
      Joi.object({
        fileUrl: Joi.string().uri().required(),
        fileName: Joi.string().required(),
      }),
    )
    .optional(),
});

module.exports = { createTodoSchema };
