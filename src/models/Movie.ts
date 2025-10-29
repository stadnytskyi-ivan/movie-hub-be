import mongoose, { Schema } from 'mongoose';
import { IMovie } from '../types';

const movieSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  actors: { type: [String], required: true },
  director: { type: String, required: true },
  genre: { type: String, required: true },
  rating: { type: Number, min: 0, max: 10, required: true },
  releaseDate: { type: Date, required: true },
  image: { type: String, required: true },
  favorite: { type: Boolean, default: false, required: true },
});

const Movie = mongoose.model<IMovie>('movies', movieSchema);

export default Movie;
