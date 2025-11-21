import { useState } from "react";

export default function BookForm({ onSubmit, initialValues, submitLabel, onCancel }) {
  const [form, setForm] = useState({
    title: initialValues.title || "",
    author: initialValues.author || "",
    status: initialValues.status || "Plan to Read"
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.title.trim() || !form.author.trim()) return;
    onSubmit(form);

    // Clear only for create form (not edit form)
    if (!onCancel) {
      setForm({ title: "", author: "", status: "Plan to Read" });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form-row">
        <input
          type="text"
          name="title"
          placeholder="Book title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="author"
          placeholder="Author name"
          value={form.author}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-row">
        <select name="status" value={form.status} onChange={handleChange}>
          <option value="Plan to Read">Plan to Read</option>
          <option value="Reading">Reading</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <div className="form-row buttons">
        <button type="submit">{submitLabel}</button>

        {onCancel && (
          <button
            type="button"
            className="secondary"
            onClick={onCancel}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
