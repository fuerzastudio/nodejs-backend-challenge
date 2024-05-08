import Joi from "joi";
import translationsMessages from "../translations-messages";

export const createPost = Joi.object({
  title: Joi.string().required().label("Título"),
  body: Joi.string().required().label("Conteúdo"),
  tags: Joi.array().items(Joi.string().required().label("Tags")),
}).messages(translationsMessages);

export const updatePost = Joi.object({
  title: Joi.string().optional().label("Título"),
  body: Joi.string().optional().label("Conteúdo"),
  tags: Joi.array().items(Joi.string().optional().label("Tags")),
}).messages(translationsMessages);

export const filterPost = Joi.object({
  page: Joi.number().required().label("Página").messages(translationsMessages),
  limit: Joi.number().required().label("Limite").messages(translationsMessages),
});
