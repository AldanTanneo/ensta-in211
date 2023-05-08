import typeorm from 'typeorm';

const Movie = new typeorm.EntitySchema({
  name: 'Movie',
  columns: {
    id: {
      // Copy of the IMDB id
      primary: true,
      type: String,
      unique: true,
    },
  },
});

export default Movie;
