import { useState } from "react";

interface FormProps {
  onAdd: (title: string, category: string, rating: number) => void;
}

export function Form({ onAdd }: FormProps) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState<number | "">("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !category || !rating) return alert("Preencha todos os campos!");
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
