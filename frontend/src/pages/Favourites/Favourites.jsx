import './Favourites.css';
import Movie from '../../components/Movie/Movie';
import { useState, useEffect } from 'react';
import axios, { HttpStatusCode } from 'axios';
import { DebounceInput } from 'react-debounce-input';

const tmdbApiKey = import.meta.env.VITE_TMDB_API_KEY;
const backendUrl = import.meta.env.VITE_BACKDEND_URL;

function useFetchMovies() {
  const [movies, setMovies] = useState([]);
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    axios
      .get(`${backendUrl}/movies`)
      .then((res) => {
        if (res.status === HttpStatusCode.Ok) {
          setFavourites(res.data.movie);
        } else {
          console.warn('Invalid response', res);
        }
      })
      .catch((err) => console.log(`Could not fetch favourite list: ${err}`));
  }, []);

  useEffect(() => {
    Promise.all(
      favourites.map(({ id }) =>
        axios
          .get(`https://api.themoviedb.org/3/movie/${id}?api_key=${tmdbApiKey}`)
          .then((res) => res.data)
          .catch((err) => console.log(`Could not complete request: ${err}`))
      )
    ).then((res) => setMovies(res.filter((elt) => elt !== undefined)));
  }, [favourites]);

  return { movies, favourites, setFavourites };
}

function Favourites() {
  const { movies, favourites, setFavourites } = useFetchMovies();

  return (
    <div className="App">
      <header className="App-header">
        <h1>Favourites</h1>
      </header>
      <main>
        <p>
          {movies.length != 0
            ? `Displaying ${movies.length} movies`
            : '❌ No favourites were found.'}
        </p>
        <div className="App-movieList">
          {movies.map((m) => (
            <Movie
              movie={m}
              favourites={favourites}
              setFavourites={setFavourites}
              key={m.id}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default Favourites;
