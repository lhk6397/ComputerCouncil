const Joi = require("joi");

module.exports.postSchema = Joi.object({
  post: Joi.object({
    title: Joi.string().required(),
    contents: Joi.string().required(),
  }).required(),
});

module.exports.commentSchema = Joi.object({
  comment: Joi.object({
    contents: Joi.string().required(),
  }).required(),
});
