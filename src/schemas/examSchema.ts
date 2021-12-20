import Joi from 'joi';

export const examSchema = Joi.object({
  name: Joi.string().min(3).required(),
  typeId: Joi.number().min(1).required(),
  classId: Joi.number().min(1).required(),
  professorId: Joi.number().min(1).required(),
  link: Joi.string().pattern(
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
  ),
});
