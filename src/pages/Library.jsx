import React, { useState, useEffect } from "react";
import axios from "axios";
import BookForm from "../components/BookForm";
import BookList from "../components/BookList";
import "./Library.css";

export default function Library() {
  const API = import.meta.env.VITE_API_URL;

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingBook, setEditingBook] = useState(null);

  // Fetch books ONLY after token is loaded
  const fetchBooks = async () => {
    try {
      const res = await axios.get(`${API}/books`);
      setBooks(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch books");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setTimeout(() => fetchBooks(), 50);
    }
  }, []);

  // Create new book
  const handleCreate = async (formData) => {
    try {
      const res = await axios.post(`${API}/books`, formData);
      setBooks((prev) => [...prev, res.data]);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add book");
    }
  };

  // Update book
  const handleUpdate = async (formData) => {
    try {
      const res = await axios.put(`${API}/books/${editingBook._id}`, formData);
      setBooks((prev) =>
        prev.map((b) => (b._id === editingBook._id ? res.data : b))
      );
      setEditingBook(null);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update book");
    }
  };

  // Delete book
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/books/${id}`);
      setBooks((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete book");
    }
  };

  if (loading) return <p className="loading">Loading your library...</p>;

  return (
    <div className="library-container">
      <h1 className="library-title">📚 Your Books</h1>

      {error && <div className="library-error">{error}</div>}

      {/* Add or Edit Book Card */}
      <div className="library-card">
        <h2>{editingBook ? "Edit Book" : "Add Book"}</h2>

        <BookForm
          initialValues={editingBook || {}}
          submitLabel={editingBook ? "Update Book" : "Add Book"}
          onSubmit={editingBook ? handleUpdate : handleCreate}
          onCancel={() => setEditingBook(null)}
        />
      </div>

      {/* Book List Section */}
      <div className="library-card">
        <div className="library-list-header">
          <h2>All Books</h2>
          <button className="refresh-btn" onClick={fetchBooks}>Refresh</button>
        </div>

        <BookList
          books={books}
          onDelete={handleDelete}
          onEditClick={setEditingBook}
        />
      </div>
    </div>
  );
}
