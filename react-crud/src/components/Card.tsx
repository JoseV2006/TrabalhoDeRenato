interface CardProps {
    id: number;
    title: string;
    category: string;
    rating: number;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
  }
  
  export function Card({ id, title, category, rating, onEdit, onDelete }: CardProps) {
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
  
  