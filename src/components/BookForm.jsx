import { useState } from "react";

function BookForm({ onSubmit, initialValues, submitLabel, onCancel }) {
  const [form, setForm] = useState({
    title: initialValues.title || "",
    author: initialValues.author || "",
    status: initialValues.status || "Plan to Read",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.author.trim()) return;
    onSubmit(form);
    // clear only if it's the create form (no cancel button)
    if (!onCancel) {
      setForm({ title: "", author: "", status: "Plan to Read" });
    }
  };

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
          placeholder="Author"
          value={form.author}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-row">
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
        >
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

export default BookForm;
