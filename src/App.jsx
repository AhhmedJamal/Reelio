import { useFetchTMDB } from "./hooks/useFetchTMDB";

export default function App() {
  const {
    data: movies,
    loading,
    error,
  } = useFetchTMDB(import.meta.env.VITE_URL_MOVIE);

  if (loading) return <p>Loading…</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 place-items-center">
      {movies.map((m) => (
        <li key={m.id}>
          {m.title} {console.log(m)}
          <img src={`https://image.tmdb.org/t/p/w500${m.poster_path}`} alt="" />
          <img
            src={`https://image.tmdb.org/t/p/w500${m.backdrop_path}`}
            alt=""
          />
        </li>
      ))}
    </ul>
  );
}
