import './Movie.css';

const dateFormatter = Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
});

function moviePoster(movie) {
  if (movie.poster_path) {
    return (
      <img
        className="Movie-poster"
        src={'https://image.tmdb.org/t/p/w185' + movie.poster_path}
      ></img>
    );
  }
}

function movieRelease(movie) {
  if (movie.release_date) {
    return (
      <div>
        <h4>Release date</h4>
        <p>{dateFormatter.format(new Date(movie.release_date))}</p>
      </div>
    );
  }
}

function Movie(movie) {
  return (
    <a
      className="Movie-container"
      href={`https://tmdb.org/movie/${movie.id}`}
      target="_blank"
      key={movie.id}
    >
      <div>{moviePoster(movie)}</div>
      <div className="Movie-details">
        <div>
          <h3>{movie.title}</h3>
          {movie.title != movie.original_title ? (
            <p>
              <i>{movie.original_title}</i>
            </p>
          ) : null}
        </div>
        {movieRelease(movie)}
      </div>
    </a>
  );
}

export default Movie;
