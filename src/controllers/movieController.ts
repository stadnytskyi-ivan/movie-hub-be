import { Request, Response } from 'express';
import Movie from '../models/Movie';
import { FilterQuery } from 'mongoose';
import { IMovie } from '../types';

export const getMovieList = async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string) || 12;
    const title = req.query.title;
    const favorite = req.query.favorite;

    const filter: FilterQuery<IMovie> = {};

    if (favorite === 'true') {
      filter.favorite = true;
    }

    if (title) {
      filter.title = { $regex: title, $options: 'i' };
    }

    const total = await Movie.countDocuments(filter);
    const movies = await Movie.find(
      filter,
      'image title rating releaseDate favorite',
    ).limit(limit);

    res.status(200).json({
      meta: {
        limit,
        total,
      },
      data: movies,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getMovieById = async (req: Request, res: Response) => {
  try {
    const movieId = req.params.id;
    const movie = await Movie.findById(movieId);
    res.json(movie);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const addMovie = async (req: Request, res: Response) => {
  try {
    const movieData = req.body;
    const newMovie = new Movie(movieData);
    await newMovie.save();
    res.status(201).json(newMovie);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const updateMovie = async (req: Request, res: Response) => {
  try {
    const movieId = req.params.id;
    const updatedData = req.body;
    const updatedMovie = await Movie.findByIdAndUpdate(movieId, updatedData, {
      new: true,
      runValidators: true,
    });
    res.status(200).json(updatedMovie);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const deleteMovie = async (req: Request, res: Response) => {
  try {
    const movieId = req.params.id;
    console.log('movieId', movieId);
    const deletedMovie = await Movie.findByIdAndDelete(movieId);

    if (!deletedMovie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    res.status(200).json(deletedMovie);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
