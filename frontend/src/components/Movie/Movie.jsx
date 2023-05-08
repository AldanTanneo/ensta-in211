import './Movie.css';
import { HiHeart, HiOutlineHeart } from 'react-icons/hi';

const backendUrl = import.meta.env.VITE_BACKDEND_URL;

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

function Movie(movie, is_favourite = false) {
  function click_favourite() {
    if (is_favourite) {
      axios
        .delete(`${VITE_BACKDEND_URL}/movies/${movie.id}`)
        .then((res) => {
          console.log('Succesfully removed movie from favourites', res);
          is_favourite = !is_favourite;
        })
        .catch((err) =>
          console.error('Could not remove movie from favourites', err)
        );
    } else {
      axios
        .post(`${VITE_BACKDEND_URL}/movies/new`, { id: movie.id })
        .then((res) => {
          console.log('Succesfully added movie to favourites', res);
          is_favourite = !is_favourite;
        })
        .catch((err) =>
          console.error('Could not add movie to favourites', err)
        );
    }
  }
  return (
    <div className="Movie-container" key={movie.id}>
      <a href={`https://tmdb.org/movie/${movie.id}`} target="_blank">
        <div>{moviePoster(movie)}</div>
      </a>
      <div className="Movie-details">
        <div>
          <a href={`https://tmdb.org/movie/${movie.id}`} target="_blank">
            <h3 className="Movie-link">{movie.title}</h3>
          </a>
          {movie.title !== movie.original_title ? (
            <p>
              <i>{movie.original_title}</i>
            </p>
          ) : null}
        </div>
        {movieRelease(movie)}
      </div>
      <div className="favourite-button" onClick={click_favourite}>
        <div className={is_favourite ? 'button-red' : 'button-white'}>
          <HiHeart className="favourite-icon" />
        </div>
      </div>
    </div>
  );
}

export default Movie;
