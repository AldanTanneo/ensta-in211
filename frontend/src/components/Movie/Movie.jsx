import './Movie.css';
import { HiHeart } from 'react-icons/hi';
import axios from 'axios';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

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
        alt={`Poster for the movie "${movie.title}"`}
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

function movieTagline(movie) {
  if (movie.tagline) {
    return (
      <div>
        <p>{movie.tagline}</p>
      </div>
    );
  }
}

function Movie({ movie, favourites, setFavourites }) {
  function click_favourite() {
    if (favourites.find((elt) => elt.id == movie.id) !== undefined) {
      axios
        .delete(`${backendUrl}/movies/${movie.id}`)
        .then((_) => {
          setFavourites(favourites.filter((elt) => elt.id != movie.id));
        })
        .catch((err) =>
          console.error('Could not remove movie from favourites', err)
        );
    } else {
      axios
        .post(`${backendUrl}/movies/new`, { id: movie.id })
        .then((_) => {
          setFavourites(favourites.concat({ id: movie.id }));
        })
        .catch((err) =>
          console.error('Could not add movie to favourites', err)
        );
    }
  }

  return (
    <div className="Movie-container" key={movie.id}>
      <a
        href={`https://tmdb.org/movie/${movie.id}`}
        target="_blank"
        rel="noreferrer"
      >
        <div>{moviePoster(movie)}</div>
      </a>
      <div className="Movie-details">
        <div>
          <a
            href={`https://tmdb.org/movie/${movie.id}`}
            target="_blank"
            rel="noreferrer"
          >
            <h3 className="Movie-link">{movie.title}</h3>
          </a>
          {movie.title !== movie.original_title ? (
            <p>
              <i>{movie.original_title}</i>
            </p>
          ) : null}
        </div>
        {movieRelease(movie)}
        {movieTagline(movie)}
      </div>
      <div className="favourite-button" onClick={click_favourite}>
        <HiHeart
          className="favourite-icon"
          color={
            favourites.find((elt) => elt.id == movie.id) !== undefined
              ? '#db3b80'
              : '#ffffff'
          }
        />
      </div>
    </div>
  );
}

export default Movie;
