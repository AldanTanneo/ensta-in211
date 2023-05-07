import typeorm from 'typeorm';

const Movie = new typeorm.EntitySchema({
  name: 'Movie',
  columns: {
    id: {
      primary: true,
      generated: 'uuid',
      type: String,
    },
    title: {
      type: String,
    },
    releasedate: {
      type: Date,
      //unique: true,
    },
  },
});

export default Movie;
