import React, { useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
  onSubmit: (task: {
    title: string;
    description: string;
    date: string;
    tags: string[];
    category: string;
  }) => void;
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
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [currentTag, setCurrentTag] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen && email) {
      fetchCategories();
    }
  }, [isOpen, email]);

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/quill/category/all/${email}`,
        { withCredentials: true }
      );
      if (Array.isArray(response.data)) {
        setCategories(response.data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag)) {
      setTags([...tags, currentTag]);
      setCurrentTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      description,
      date,
      tags,
      category: selectedCategory,
    });
    // Reset form
    setTitle("");
    setDescription("");
    setDate(new Date().toISOString().split("T")[0]);
    setTags([]);
    setSelectedCategory("");
    onClose();
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
            <label>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="task-input"
            />
          </div>

          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="task-input"
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="task-input task-textarea"
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
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="add-tag-btn"
              >
                Add
              </button>
            </div>
            <div className="tags-container">
              {tags.map((tag) => (
                <span key={tag} className="tag">
                  #{tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="remove-tag"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              required
              className="task-input"
              disabled={isLoading}
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

          <button type="submit" className="submit-btn">
            Add Note
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;
