import React, { useState, useRef } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { FiList, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { SlCalender } from "react-icons/sl";
import "./css-files/home.css";

const SignUp: React.FC = () => {
  const [activeView, setActiveView] = useState<
    "image" | "taskList" | "calendar"
  >("image");
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [showSettings, setShowSettings] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTaskListClick = () => {
    setActiveView("taskList");
  };

  const handleCalendarClick = () => {
    setActiveView("calendar");
  };

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  const navigateMonth = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate);
    if (direction === "prev") {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
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
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveChanges = () => {
    // Here you would typically send the updated data to your backend
    alert("Changes saved successfully!");
  };

  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const today = new Date();

    // Get first day of month
    const firstDay = new Date(year, month, 1);
    // Get last day of month
    const lastDay = new Date(year, month + 1, 0);
    // Get day of week for first day (0-6, where 0 is Sunday)
    const startDay = firstDay.getDay();
    // Total days in month
    const daysInMonth = lastDay.getDate();

    // Calculate total cells needed (always show 6 weeks)
    const totalCells = 6 * 7;
    const days = [];

    // Previous month days
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = 0; i < startDay; i++) {
      days.push(
        <div key={`prev-${i}`} className="calendar-day other-month">
          {prevMonthLastDay - startDay + i + 1}
        </div>
      );
    }

    // Current month days
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

    // Next month days
    const daysAdded = startDay + daysInMonth;
    const remainingCells = totalCells - daysAdded;
    for (let i = 1; i <= remainingCells; i++) {
      days.push(
        <div key={`next-${i}`} className="calendar-day other-month">
          {i}
        </div>
      );
    }

    return days;
  };

  return (
    <>
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
                        <span>Upload Photo</span>
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
                  <button className="logout-btn1">Logout</button>
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
                      </span>{" "}
                      <span className="text-align2">Note List</span>
                    </div>
                    <div>
                      <span>2</span>
                    </div>
                  </button>
                </div>
                <div className="calender btn-align">
                  <button onClick={handleCalendarClick}>
                    <div>
                      <span className="text-align1">
                        <SlCalender />
                      </span>{" "}
                      <span className="text-align2">Calendar</span>
                    </div>
                    <div>
                      <span>2</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            <div className="home-task">
              <h3>Category</h3>
              <div className="list-category">
                <div className="list-category1 btn-align">
                  <button>
                    <div className="category-box">
                      <div className="category-box-inside"></div>
                      <div>
                        <span className="text-align1">Category 1</span>
                      </div>
                    </div>
                    <div>
                      <span>2</span>
                    </div>
                  </button>
                </div>
                <div className="list-category2 btn-align">
                  <button>
                    <div className="category-box">
                      <div className="category-box-inside"></div>
                      <div>
                        <span className="text-align1">Category 2</span>
                      </div>
                    </div>
                    <div>
                      <span>2</span>
                    </div>
                  </button>
                </div>
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

                <div className="activity-item">
                  <h3 className="activity-title">
                    Attend Yoga Classes Next Week
                  </h3>
                  <p className="activity-date">6th Apr 2024</p>
                  <p className="activity-description">
                    As a way to prioritize my physical and mental well-being, I{" "}
                  </p>
                  <p>
                    <span className="activity-tag">#Yoga</span>{" "}
                    <span className="activity-tag">#Fitness</span>
                  </p>
                </div>

                <div className="activity-item">
                  <h3 className="activity-title">Start Learning Guitar</h3>
                  <p className="activity-date">6th Apr 2024</p>
                  <p className="activity-description">
                    Learning to play the guitar has been a dream of mine for you{" "}
                  </p>
                  <p>
                    <span className="activity-tag">#Guitar</span>
                  </p>
                </div>

                <div className="activity-item">
                  <h3 className="activity-title">
                    Practice Mindfulness Meditation
                  </h3>
                  <p className="activity-date">6th Apr 2024</p>
                  <p className="activity-description">
                    In today's fast-paced world, it's easy to feel overwhelmed{" "}
                  </p>
                  <p>
                    <span className="activity-tag">#Meditation</span>{" "}
                    <span className="activity-tag">#Mindfulness</span>
                  </p>
                </div>
              </div>
              <div className="floating-button-container">
                <button className="floating-button">
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
                <div className="weekday">Sun</div>
                <div className="weekday">Mon</div>
                <div className="weekday">Tue</div>
                <div className="weekday">Wed</div>
                <div className="weekday">Thu</div>
                <div className="weekday">Fri</div>
                <div className="weekday">Sat</div>
              </div>
              <div className="calendar-grid">{renderCalendar()}</div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SignUp;
