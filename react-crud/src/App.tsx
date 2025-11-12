import { useState } from "react";

// Card.tsx
interface CardProps {
  id: number;
  title: string;
  category: string;
  rating: number;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

function Card({ id, title, category, rating, onEdit, onDelete }: CardProps) {
  return (
    <div className="card">
      <h3>🎬 {title}</h3>
      <p>📂 <strong>Categoria:</strong> {category}</p>
      <p>⭐ <strong>Nota:</strong> {rating}</p>
      <div className="card-buttons">
        <button onClick={() => onEdit(id)} className="btn-edit">
          🖋️ Editar
        </button>
        <button onClick={() => onDelete(id)} className="btn-delete">
          🗑️ Excluir
        </button>
      </div>
    </div>
  );
}

// Form.tsx
interface FormProps {
  onAdd: (title: string, category: string, rating: number) => void;
}

function Form({ onAdd }: FormProps) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState<number | "">("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !category || rating === "") return alert("Preencha todos os campos!");
    onAdd(title, category, Number(rating));
    setTitle("");
    setCategory("");
    setRating("");
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Título do filme/série"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Categoria"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <input
        type="number"
        placeholder="Nota (0-10)"
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
        min={0}
        max={10}
      />
      <button type="submit">Adicionar</button>
    </form>
  );
}

// App.tsx
interface Movie {
  id: number;
  title: string;
  category: string;
  rating: number;
}

export default function App() {
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
      <header>
        <h1>Meu Catálogo de Filmes e Séries</h1>
      </header>
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
