import './Home.css';
import Movie from '../../components/Movie/Movie';
import { useState, useEffect } from 'react';
import axios, { HttpStatusCode } from 'axios';
import { DebounceInput } from 'react-debounce-input';

const tmdbApiKey = import.meta.env.VITE_TMDB_API_KEY;

function useFetchMovies() {
  const [movieName, setMovieName] = useState('');
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${tmdbApiKey}`
      )
      .then((res) => {
        if (res.status == HttpStatusCode.Ok) {
          setMovies(res.data.results);
        }
      })
      .catch((err) => {
        console.log(`Could not complete request: ${err}`);
      });
  }, []);

  useEffect(() => {
    if (movieName) {
      console.log(movieName);
      axios
        .get(
          `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
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
    }
  }, [movieName]);

  return { movies, movieName, setMovieName };
}

function Home() {
  const { movies, movieName, setMovieName } = useFetchMovies();

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
        <div className="App-movieList">{movies.map(Movie)}</div>
      </main>
    </div>
  );
}

export default Home;
