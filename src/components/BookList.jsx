export default function BookList({ books, onDelete, onEditClick }) {

  if (!books || books.length === 0) {
    return <p>No books yet. Add your first one!</p>;
  }

  return (
    <ul className="book-list">
      {books.map((book) => (
        <li key={book._id} className="book-item">
          <div>
            <h3>{book.title}</h3>
            <p className="muted">by {book.author}</p>
            <p>
              <strong>Status:</strong> {book.status}
            </p>
          </div>

          <div className="book-actions">
            <button onClick={() => onEditClick(book)}>Edit</button>
            <button className="danger" onClick={() => onDelete(book._id)}>
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
