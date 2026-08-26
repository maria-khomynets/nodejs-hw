import { Joi, Segments } from 'celebrate';

import { isValidObjectId } from 'mongoose';

import { TAGS } from '../constants/tags.js';

const objectIdValidator = (value, helpers) => {
  return !isValidObjectId(value) ? helpers.message('Invalid id format') : value;
};

export const noteIdParamSchema = {
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string().custom(objectIdValidator).required(),
  }),
};

export const createNoteSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1).max(100).required(),

    content: Joi.string().allow('').optional(),

    tag: Joi.string()
      .valid(...TAGS)
      .optional(),
  }),
};
