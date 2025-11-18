import { useEffect, useState } from "react";
import axios from "axios";
import BookForm from "./components/BookForm";
import BookList from "./components/BookList";

const API_URL = "https://library-backend-73m6.onrender.com";

function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingBook, setEditingBook] = useState(null); // book object or null
  const [error, setError] = useState("");

  const fetchBooks = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await axios.get(API_URL);
      setBooks(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch books");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleCreate = async (bookData) => {
    try {
      setError("");
      const res = await axios.post(API_URL, bookData);
      setBooks((prev) => [...prev, res.data]);
    } catch (err) {
      console.error(err);
      setError("Failed to add book");
    }
  };

  const handleUpdate = async (id, updatedData) => {
    try {
      setError("");
      const res = await axios.put(`${API_URL}/${id}`, updatedData);
      setBooks((prev) =>
        prev.map((b) => (b._id === id ? res.data : b))
      );
      setEditingBook(null);
    } catch (err) {
      console.error(err);
      setError("Failed to update book");
    }
  };

  const handleDelete = async (id) => {
    try {
      setError("");
      await axios.delete(`${API_URL}/${id}`);
      setBooks((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      console.error(err);
      setError("Failed to delete book");
    }
  };

  return (
    <div className="app-container">
      <h1>📚 Book Library</h1>
      <p className="subtitle">
        Personalised Books Library
      </p>

      {error && <div className="error">{error}</div>}

      <section className="card">
        <h2>Add New Book</h2>
        <BookForm
          onSubmit={handleCreate}
          initialValues={{ title: "", author: "", status: "Plan to Read" }}
          submitLabel="Add Book"
        />
      </section>

      <section className="card">
        <div className="list-header">
          <h2>All Books</h2>
          <button onClick={fetchBooks}>Refresh</button>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <BookList
            books={books}
            onDelete={handleDelete}
            onEditClick={setEditingBook}
          />
        )}
      </section>

      {editingBook && (
        <section className="card">
          <h2>Edit Book</h2>
          <BookForm
            onSubmit={(data) => handleUpdate(editingBook._id, data)}
            initialValues={editingBook}
            submitLabel="Update Book"
            onCancel={() => setEditingBook(null)}
          />
        </section>
      )}
    </div>
  );
}

export default App;
