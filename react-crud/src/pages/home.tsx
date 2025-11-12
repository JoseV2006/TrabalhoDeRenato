import { useState } from "react";
import { Card } from "../components/Card";
import { Form } from "../components/Form";

interface Movie {
  id: number;
  title: string;
  category: string;
  rating: number;
}

export function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [nextId, setNextId] = useState(1);

  const addMovie = (title: string, category: string, rating: number) => {
    const newMovie = { id: nextId, title, category, rating };
    setMovies([...movies, newMovie]);
    setNextId(nextId + 1);
  };

  const deleteMovie = (id: number) => {
    setMovies(movies.filter((movie) => movie.id !== id));
  };

  const editMovie = (id: number) => {
    const movie = movies.find((m) => m.id === id);
    if (!movie) return;
    const newTitle = prompt("Novo título:", movie.title);
    const newCategory = prompt("Nova categoria:", movie.category);
    const newRating = prompt("Nova nota (0-10):", movie.rating.toString());

    if (newTitle && newCategory && newRating) {
      setMovies(
        movies.map((m) =>
          m.id === id
            ? { ...m, title: newTitle, category: newCategory, rating: Number(newRating) }
            : m
        )
      );
    }
  };

  return (
    <div className="container">
      <h1 className="section-title">Meu Catálogo de Filmes e Séries</h1>
      <Form onAdd={addMovie} />
      {movies.length === 0 ? (
        <p className="empty-message">Nenhum filme/série adicionado ainda 😢</p>
      ) : (
        <div className="card-list">
          {movies.map((movie) => (
            <Card
              key={movie.id}
              id={movie.id}
              title={movie.title}
              category={movie.category}
              rating={movie.rating}
              onDelete={deleteMovie}
              onEdit={editMovie}
            />
          ))}
        </div>
      )}
    </div>
  );
}
