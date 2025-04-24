import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { IoSettingsOutline, IoAddCircleOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { IoIosContact } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiList, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { SlCalender } from "react-icons/sl";
import axios from "axios";
import AddTaskModal from "../AddTaskModal/AddTaskModal";
import "./css-files/home.css";

interface Category {
  _id: string;
  email: string;
  categoryType: string;
}

interface Note {
  _id: string;
  email: string;
  title: string;
  date: string;
  description: string;
  categoryType: string;
  keyWords: string[];
}

const Home: React.FC = () => {
  const location = useLocation();
  const { email } = location.state || {};
  const navigate = useNavigate();

  // State
  const [activeView, setActiveView] = useState<
    "image" | "taskList" | "calendar"
  >("image");
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [showSettings, setShowSettings] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryCounts, setCategoryCounts] = useState<Record<string, number>>(
    {}
  );
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);

  // Refs
  const fileInputRef = useRef<HTMLInputElement>(null);
  const categoryInputRef = useRef<HTMLInputElement>(null);

  // Fetch initial data
  useEffect(() => {
    if (email) {
      fetchNotes();
      fetchCategories();
    }
  }, [email]);

  // Verify authentication
  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/quill/verify",
          {},
          { withCredentials: true }
        );
        if (!response.data.status) {
          navigate("/");
        }
      } catch (error) {
        console.error("Auth verification failed:", error);
        navigate("/");
      }
    };
    verifyAuth();
  }, [navigate]);

  // Fetch notes
  const fetchNotes = async () => {
    if (!email) return;

    setIsLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/quill/note/notes/${email}`,
        { withCredentials: true }
      );

      if (Array.isArray(response.data)) {
        const formattedNotes = response.data.map((note) => ({
          ...note,
          date: new Date(note.date).toISOString(),
        }));
        setNotes(formattedNotes);
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    if (!email) return;

    try {
      const response = await axios.get(
        `http://localhost:5000/quill/category/all/${email}`,
        { withCredentials: true }
      );

      if (Array.isArray(response.data)) {
        setCategories(response.data);
        fetchCategoryCounts(response.data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Fetch note counts per category
  const fetchCategoryCounts = async (categories: Category[]) => {
    if (!email) return;

    try {
      const counts = await Promise.all(
        categories.map(async (category) => {
          const response = await axios.get(
            `http://localhost:5000/quill/category/note-count/${email}/${category.categoryType}`,
            { withCredentials: true }
          );
          return {
            type: category.categoryType,
            count: response.data.count || 0,
          };
        })
      );

      const countsObj = counts.reduce((acc, curr) => {
        acc[curr.type] = curr.count;
        return acc;
      }, {} as Record<string, number>);

      setCategoryCounts(countsObj);
    } catch (error) {
      console.error("Error fetching category counts:", error);
    }
  };

  // Add new category
  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) return;

    try {
      const response = await axios.post(
        "http://localhost:5000/quill/category/create",
        {
          email,
          categoryType: newCategoryName,
        },
        { withCredentials: true }
      );

      if (response.data) {
        setCategories([...categories, response.data]);
        setNewCategoryName("");
        setIsAddingCategory(false);
        fetchCategoryCounts([...categories, response.data]);
      }
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  // Delete category
  const handleDeleteCategory = async (categoryType: string) => {
    try {
      await axios.delete(
        `http://localhost:5000/quill/category/delete/${email}/${categoryType}`,
        { withCredentials: true }
      );

      const updatedCategories = categories.filter(
        (cat) => cat.categoryType !== categoryType
      );
      setCategories(updatedCategories);

      const updatedCounts = { ...categoryCounts };
      delete updatedCounts[categoryType];
      setCategoryCounts(updatedCounts);
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  // Handle form submission
  const handleCategorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleAddCategory();
  };

  // Generate consistent color based on category name
  const getCategoryColor = (categoryType: string) => {
    const colors = [
      "#FF6B6B",
      "#4ECDC4",
      "#45B7D1",
      "#FFA07A",
      "#98D8C8",
      "#F06292",
      "#7986CB",
      "#9575CD",
    ];
    const index = Math.abs(hashCode(categoryType)) % colors.length;
    return colors[index];
  };

  // Simple hash function for consistent color assignment
  const hashCode = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
  };

  const handleTaskListClick = async () => {
    setActiveView("taskList");
    await fetchNotes();
  };

  const handleCalendarClick = () => setActiveView("calendar");
  const toggleSettings = () => setShowSettings(!showSettings);

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/quill/logout",
        {},
        { withCredentials: true }
      );
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const navigateMonth = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + (direction === "prev" ? -1 : 1));
    setCurrentDate(newDate);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = () => alert("Changes saved successfully!");

  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const today = new Date();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDay = firstDay.getDay();
    const daysInMonth = lastDay.getDate();
    const prevMonthLastDay = new Date(year, month, 0).getDate();

    const days = [];
    for (let i = 0; i < startDay; i++) {
      days.push(
        <div key={`prev-${i}`} className="calendar-day other-month">
          {prevMonthLastDay - startDay + i + 1}
        </div>
      );
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const isToday =
        i === today.getDate() &&
        month === today.getMonth() &&
        year === today.getFullYear();
      days.push(
        <div
          key={`current-${i}`}
          className={`calendar-day ${isToday ? "today" : ""}`}
        >
          {i}
        </div>
      );
    }

    const remainingCells = 6 * 7 - (startDay + daysInMonth);
    for (let i = 1; i <= remainingCells; i++) {
      days.push(
        <div key={`next-${i}`} className="calendar-day other-month">
          {i}
        </div>
      );
    }

    return days;
  };

  const handleAddTask = (task: {
    title: string;
    description: string;
    date: string;
    tags: string[];
    category: string;
  }) => {
    console.log("New task:", task);
    alert(`Task "${task.title}" added successfully!`);
  };

  return (
    <div className="main-container">
      {showSettings ? (
        <div className="settings-container">
          <div className="settings-header">
            <h2>Settings</h2>
            <button className="close-settings" onClick={toggleSettings}>
              <RxCross2 />
            </button>
          </div>
          <div className="settings-content">
            <div className="settings-item">
              <h3>Account</h3>
              <div className="profile-image-container">
                <div
                  className="profile-image-wrapper"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="profile-image"
                    />
                  ) : (
                    <div className="profile-image-placeholder">
                      <span className="default-image">
                        <IoIosContact />
                      </span>
                    </div>
                  )}
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    style={{ display: "none" }}
                  />
                </div>
              </div>
              <div className="user-info-form">
                <div className="form-group">
                  <label htmlFor="fullName">Full Name</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    placeholder="John Doe"
                    value={userData.fullName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="johndoe@gmail.com"
                    value={userData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="********"
                    value={userData.password}
                    onChange={handleInputChange}
                  />
                </div>
                <button
                  className="save-changes-btn"
                  onClick={handleSaveChanges}
                >
                  Save Changes
                </button>
              </div>
              <div>
                <button className="logout-btn1" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </div>
            <div className="settings-item">
              <h3>Appearance</h3>
              <div className="settings-options">
                <label>
                  <input
                    type="radio"
                    name="theme"
                    value="light"
                    defaultChecked
                  />{" "}
                  Light Mode
                </label>
                <label>
                  <input type="radio" name="theme" value="dark" /> Dark Mode
                </label>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="left-container">
          <div className="left-top">
            <div className="home">
              <h2>Home</h2>
            </div>
            <div className="home-button">
              <button onClick={toggleSettings}>
                <IoSettingsOutline />
              </button>
            </div>
          </div>

          <div className="home-search-bar">
            <input type="text" placeholder="Search....." />
          </div>

          <div className="home-task">
            <h3>Notes</h3>
            <div className="home-task-list">
              <div className="task-list btn-align">
                <button onClick={handleTaskListClick}>
                  <div>
                    <span className="text-align1">
                      <FiList />
                    </span>
                    <span className="text-align2">Note List</span>
                  </div>
                  <div>
                    <span>{notes.length}</span>
                  </div>
                </button>
              </div>
              <div className="calender btn-align">
                <button onClick={handleCalendarClick}>
                  <div>
                    <span className="text-align1">
                      <SlCalender />
                    </span>
                    <span className="text-align2">Calendar</span>
                  </div>
                  <div>
                    <span></span>
                  </div>
                </button>
              </div>
            </div>
          </div>

          <div className="home-task">
            <div className="category-main">
              <div className="category-header">
                <h3>Category</h3>
              </div>
              <div
                className="add-category"
                onClick={() => setIsAddingCategory(true)}
              >
                <IoAddCircleOutline />
              </div>
            </div>
            <div className="list-category">
              {categories.map((category) => (
                <div key={category._id} className="list-category-item">
                  <div className="category-display">
                    <div className="category-box">
                      <div
                        className="category-box-inside"
                        style={{
                          backgroundColor: getCategoryColor(
                            category.categoryType
                          ),
                        }}
                      ></div>
                      <div className="category-content">
                        <div className="category-type">
                          {category.categoryType}
                        </div>
                      </div>
                    </div>
                    <div className="category-actions">
                      <div className="category-count">
                        {categoryCounts[category.categoryType] || 0}
                      </div>
                      <div
                        className="delete-category-icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteCategory(category.categoryType);
                        }}
                      >
                        <RiDeleteBin6Line />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {isAddingCategory && (
                <div className="list-category-item">
                  <form onSubmit={handleCategorySubmit}>
                    <div className="category-box">
                      <div
                        className="category-box-inside"
                        style={{ backgroundColor: "#ccc" }}
                      ></div>
                      <input
                        type="text"
                        ref={categoryInputRef}
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                        placeholder="Type category name and press Enter"
                        className="category-input"
                        onBlur={() => {
                          if (!newCategoryName.trim()) {
                            setIsAddingCategory(false);
                          }
                        }}
                        autoFocus
                      />
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
          <div className="left-image">
            <img src="Image/left-bottom-bg.png" alt="Description" />
          </div>
        </div>
      )}

      <div className="right-container">
        {activeView === "image" && (
          <div className="right-container1">
            <div className="right-image">
              <img src="Image/right-bg.png" alt="" />
            </div>
          </div>
        )}

        {activeView === "taskList" && (
          <>
            <div className="activity-feed">
              <h2 className="activity-header">Note List</h2>
              {isLoading ? (
                <div>Loading notes...</div>
              ) : notes.length === 0 ? (
                <p className="no-notes-message">
                  No notes found. Create your first note!
                </p>
              ) : (
                notes.map((note) => (
                  <div key={note._id} className="activity-item">
                    <h3 className="activity-title">{note.title}</h3>
                    <p className="activity-date">
                      {new Date(note.date).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                    <p className="activity-description">
                      {note.description.length > 100
                        ? `${note.description.substring(0, 100)}...`
                        : note.description}
                    </p>
                    {note.keyWords && note.keyWords.length > 0 && (
                      <div className="activity-tags">
                        {note.keyWords.map((tag) => (
                          <span key={tag} className="activity-tag">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                    {note.categoryType && (
                      <div className="activity-category">
                        Category: {note.categoryType}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
            <div className="floating-button-container">
              <button
                className="floating-button"
                onClick={() => setShowTaskModal(true)}
              >
                <span>+</span>
              </button>
            </div>
          </>
        )}

        {activeView === "calendar" && (
          <div className="calendar-view">
            <div className="calendar-header">
              <button
                className="nav-button"
                onClick={() => navigateMonth("prev")}
              >
                <FiChevronLeft />
              </button>
              <h2>
                {currentDate.toLocaleString("default", { month: "long" })}{" "}
                {currentDate.getFullYear()}
              </h2>
              <button
                className="nav-button"
                onClick={() => navigateMonth("next")}
              >
                <FiChevronRight />
              </button>
            </div>
            <div className="calendar-weekdays">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="weekday">
                  {day}
                </div>
              ))}
            </div>
            <div className="calendar-grid">{renderCalendar()}</div>
          </div>
        )}
      </div>
      <AddTaskModal
        isOpen={showTaskModal}
        onClose={() => setShowTaskModal(false)}
        categories={categories.map((cat) => ({
          id: cat._id,
          name: cat.categoryType,
          color: getCategoryColor(cat.categoryType),
        }))}
        onSubmit={handleAddTask}
      />
    </div>
  );
};

export default Home;
