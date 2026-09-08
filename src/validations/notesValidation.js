import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';

import { TAGS } from '../constants/tags.js';

// Кастомна валідація MongoDB ObjectId
const objectIdValidator = (value, helpers) => {
  if (!isValidObjectId(value)) {
    return helpers.message('Invalid id format');
  }

  return value;
};

// Валідація GET /notes
export const getAllNotesSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),

    perPage: Joi.number().integer().min(5).max(20).default(10),

    tag: Joi.string()
      .valid(...TAGS)
      .optional()
      .messages({
        'any.only': `Tag must be one of: ${TAGS.join(', ')}`,
        'string.base': 'Tag must be a string',
      }),

    search: Joi.string().allow('').optional().messages({
      'string.base': 'Search must be a string',
    }),
  }),
};

// Валідація параметра noteId
export const noteIdSchema = {
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string().custom(objectIdValidator).required().messages({
      'any.required': 'Note ID is required',
      'string.empty': 'Note ID cannot be empty',
    }),
  }),
};

// Валідація POST /notes
export const createNoteSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1).required().messages({
      'string.base': 'Title must be a string',
      'string.min': 'Title must have at least {#limit} character',
      'any.required': 'Title is required',
      'string.empty': 'Title cannot be empty',
    }),

    content: Joi.string().allow('').optional().messages({
      'string.base': 'Content must be a string',
    }),

    tag: Joi.string()
      .valid(...TAGS)
      .optional()
      .messages({
        'any.only': `Tag must be one of: ${TAGS.join(', ')}`,
        'string.base': 'Tag must be a string',
      }),
  }),
};

// Валідація PATCH /notes/:noteId
export const updateNoteSchema = {
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string().custom(objectIdValidator).required().messages({
      'any.required': 'Note ID is required',
      'string.empty': 'Note ID cannot be empty',
    }),
  }),

  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1).optional().messages({
      'string.base': 'Title must be a string',
      'string.min': 'Title must have at least {#limit} character',
      'string.empty': 'Title cannot be empty',
    }),

    content: Joi.string().allow('').optional().messages({
      'string.base': 'Content must be a string',
    }),

    tag: Joi.string()
      .valid(...TAGS)
      .optional()
      .messages({
        'any.only': `Tag must be one of: ${TAGS.join(', ')}`,
        'string.base': 'Tag must be a string',
      }),
  }).min(1),
};
