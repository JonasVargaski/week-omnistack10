import { Schema, model } from 'mongoose';
import PointSchema from './utils/PointSchema';

const DevSchema = new Schema({
  name: {
    type: String,
    required: false,
  },
  github_username: {
    type: String,
    required: true,
    unique: true,
  },
  bio: {
    type: String,
    required: false,
  },
  avatar_url: {
    type: String,
    required: false,
  },
  techs: {
    type: [String],
    required: false,
  },
  location: {
    type: PointSchema,
    index: '2dsphere',
  },
});

export default model('Dev', DevSchema);
