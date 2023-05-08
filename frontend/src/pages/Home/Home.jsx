import './Home.css';
import Movie from '../../components/Movie/Movie';
import { useState, useEffect } from 'react';
import axios, { HttpStatusCode } from 'axios';
import { DebounceInput } from 'react-debounce-input';

const tmdbApiKey = import.meta.env.VITE_TMDB_API_KEY;
const backendUrl = import.meta.env.VITE_BACKDEND_URL;

function useFetchMovies() {
  const [movieName, setMovieName] = useState('');
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
    axios
      .get(
        movieName === ''
          ? `https://api.themoviedb.org/3/trending/movie/week?api_key=${tmdbApiKey}`
          : `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
              movieName
            )}&api_key=${tmdbApiKey}`
      )
      .then((res) => {
        if (res.status == HttpStatusCode.Ok) {
          setMovies(res.data.results);
        }
      })
      .catch((err) => {
        console.log(`Could not complete request: ${err}`);
      });
  }, [movieName]);

  return { movies, movieName, setMovieName, favourites, setFavourites };
}

function Home() {
  const { movies, movieName, setMovieName, favourites, setFavourites } =
    useFetchMovies();

  function updateFavourite(id, make_favourite) {
    if (make_favourite && !favourites.find((elt) => elt.id == id)) {
      setFavourites(favourites.filter((elt) => elt.id != id));
    } else if (!make_favourite && favourites.find((elt) => elt.id == id)) {
      favourites.push({ id });
      setFavourites(favourites);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Movies Browser</h1>
        <DebounceInput
          className="App-searchbar"
          name="movieName"
          placeholder="Enter a movie title"
          value={movieName}
          debounceTimeout={500}
          minLength={1}
          onChange={(event) => setMovieName(event.target.value)}
        />
      </header>
      <main>
        <p>
          {movies.length != 0
            ? `Displaying ${movies.length} movies`
            : '❌ No movies were found.'}
        </p>
        <div className="App-movieList">
          {movies.map((m) =>
            Movie(
              m,
              favourites.find((elt) => elt.id == m.id),
              updateFavourite
            )
          )}
        </div>
      </main>
    </div>
  );
}

export default Home;
