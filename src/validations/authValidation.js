import { Joi, Segments } from 'celebrate';

export const registerUserSchema = {
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().required().messages({
      'string.email': 'Invalid email format',
      'any.required': 'Email is required',
      'string.empty': 'Email cannot be empty',
    }),
    password: Joi.string().min(8).required().messages({
      'string.min': 'Password must be at least {#limit} characters',
      'any.required': 'Password is required',
      'string.empty': 'Password cannot be empty',
    }),
  }),
};

export const requestResetEmailSchema = {
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().required().messages({
      'string.email': 'Invalid email format',
      'any.required': 'Email is required',
      'string.empty': 'Email cannot be empty',
    }),
  }),
};

export const resetPasswordSchema = {
  [Segments.BODY]: Joi.object({
    token: Joi.string().required().messages({
      'any.required': 'Token is required',
      'string.empty': 'Token cannot be empty',
    }),
    password: Joi.string().min(8).required().messages({
      'string.min': 'Password must be at least {#limit} characters',
      'any.required': 'Password is required',
      'string.empty': 'Password cannot be empty',
    }),
  }),
};

export const loginUserSchema = {
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().required().messages({
      'string.email': 'Invalid email format',
      'any.required': 'Email is required',
      'string.empty': 'Email cannot be empty',
    }),
    password: Joi.string().required().messages({
      'any.required': 'Password is required',
      'string.empty': 'Password cannot be empty',
    }),
  }),
};
