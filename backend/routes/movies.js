import express from 'express';
import { appDataSource } from '../datasource.js';
import Movie from '../entities/movie.js';

const router = express.Router();

router.get('/', function (req, res) {
  console.log('Listener on path "/" called.');
  appDataSource
    .getRepository(Movie)
    .find({})
    .then(function (movie) {
      res.json({ movie: movie });
    });
});

router.post('/new', function (req, res) {
  console.log('Listener on POST /new called.');
  console.log('Request body:', req.body);

  const movieRepository = appDataSource.getRepository(Movie);
  const newMovie = movieRepository.create({
    id: req.body.id,
  });

  movieRepository
    .insert(newMovie)
    .then(function (newDocument) {
      res.status(201).json(newDocument);
    })
    .catch(function (error) {
      console.error(error);
      if (error.code === '23505') {
        res.status(400).json({
          message: `Movie with title "${newMovie.title}" already exists`,
        });
      } else {
        res.status(500).json({ message: 'Error while creating the movie' });
      }
    });
});

router.delete('/:movieId', function (req, res) {
  appDataSource
    .getRepository(Movie)
    .delete({ id: req.params.movieId })
    .then(function () {
      res.status(204).json({ message: 'Movie successfully deleted' });
    })
    .catch(function () {
      res.status(500).json({ message: 'Error while deleting the movie' });
    });
});

export default router;
