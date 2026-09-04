// src/models/note.js
import { TAGS } from '../constants/tags.js';
import { Schema } from 'mongoose';
import { model } from 'mongoose';

const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: false,
      trim: true,
      default: '',
    },
    tag: {
      type: String,
      enum: TAGS,
      default: 'Todo',
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  { timestamps: true, versionKey: false },
);

noteSchema.index({ tag: 1, userId: 1 });

export const Note = model('Note', noteSchema);
