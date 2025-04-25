import React, { useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
  onSubmit: (task: {
    email: string;
    title: string;
    description: string;
    date: string;
    tags: string[];
    category: string;
  }) => Promise<void>;
  editingNote?: {
    _id: string;
    title: string;
    description: string;
    date: string;
    keyWords: string[];
    categoryType: string;
  } | null;
}

interface Category {
  _id: string;
  categoryType: string;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({
  isOpen,
  onClose,
  email,
  onSubmit,
  editingNote,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [currentTag, setCurrentTag] = useState("");
  const [keyWords, setKeyWords] = useState<string[]>([]);
  const [categoryType, setCategoryType] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title);
      setDescription(editingNote.description);
      setDate(editingNote.date.split("T")[0]);
      setKeyWords(editingNote.keyWords || []);
      setCategoryType(editingNote.categoryType);
    } else {
      resetForm();
    }
  }, [editingNote]);

  useEffect(() => {
    if (isOpen && email) {
      fetchCategories();
      setFormSubmitted(false);
    }
  }, [isOpen, email]);

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5000/quill/category/all/${email}`,
        { credentials: "include" }
      );
      const data = await response.json();
      if (Array.isArray(data)) {
        setCategories(data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddTag = () => {
    if (currentTag.trim() && !keyWords.includes(currentTag)) {
      setKeyWords([...keyWords, currentTag]);
      setCurrentTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setKeyWords(keyWords.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formSubmitted || isSubmitting) return;

    setIsSubmitting(true);
    setFormSubmitted(true);

    const noteData = {
      email,
      title,
      description,
      date: new Date(date).toISOString(),
      tags: keyWords,
      category: categoryType,
    };

    try {
      await onSubmit(noteData);
    } catch (error) {
      console.error("Error creating note:", error);
      alert("Failed to create note. Please try again.");
      setFormSubmitted(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setDate(new Date().toISOString().split("T")[0]);
    setKeyWords([]);
    setCategoryType("");
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-modal" onClick={onClose}>
          <RxCross2 />
        </button>
        <h2>Add New Note</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="task-input"
              disabled={isSubmitting}
            />
          </div>

          <div className="form-group">
            <label>Date *</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="task-input"
              disabled={isSubmitting}
            />
          </div>

          <div className="form-group">
            <label>Description *</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="task-input task-textarea"
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="form-group">
            <label>Tags</label>
            <div className="tags-input">
              <input
                type="text"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                placeholder="Add a tag"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
                className="task-input"
                disabled={isSubmitting}
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="add-tag-btn"
                disabled={isSubmitting}
              >
                Add
              </button>
            </div>
            <div className="tags-container">
              {keyWords.map((tag) => (
                <span key={tag} className="tag">
                  #{tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="remove-tag"
                    disabled={isSubmitting}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Category *</label>
            <select
              value={categoryType}
              onChange={(e) => setCategoryType(e.target.value)}
              required
              className="task-input"
              disabled={isLoading || isSubmitting}
            >
              <option value="">Select a category</option>
              {isLoading ? (
                <option value="">Loading categories...</option>
              ) : (
                categories.map((category) => (
                  <option key={category._id} value={category.categoryType}>
                    {category.categoryType}
                  </option>
                ))
              )}
            </select>
          </div>

          <button type="submit" className="submit-btn" disabled={isSubmitting}>
            {isSubmitting
              ? editingNote
                ? "Updating..."
                : "Creating..."
              : editingNote
              ? "Update Note"
              : "Add Note"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;
