import React, { useState } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { FiList, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { SlCalender } from "react-icons/sl";
import "./css-files/home.css";

const SignUp: React.FC = () => {
  const [activeView, setActiveView] = useState<
    "image" | "taskList" | "calendar"
  >("image");
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  const handleTaskListClick = () => {
    setActiveView("taskList");
  };

  const handleCalendarClick = () => {
    setActiveView("calendar");
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
        <div className="left-container">
          <div className="left-top">
            <div className="home">
              <h2>Home</h2>
            </div>
            <div className="home-button">
              <button>
                <IoSettingsOutline />
              </button>
            </div>
          </div>

          <div className="home-search-bar">
            <input type="text" placeholder="Search....." />
          </div>

          <div className="home-task">
            <h3>Task</h3>
            <div className="home-task-list">
              <div className="task-list btn-align">
                <button onClick={handleTaskListClick}>
                  <div>
                    <span className="text-align1">
                      <FiList />
                    </span>{" "}
                    <span className="text-align2">Task List</span>
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
            <h3>List</h3>
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
        <div className="right-container">
          {activeView === "image" && (
            <div className="right-container1">
              <div className="right-image">
                <img src="Image/right-bg.png" alt="" />
              </div>
            </div>
          )}

          {activeView === "taskList" && (
            <div className="activity-feed">
              <h2 className="activity-header">Task List</h2>

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

      <div className="floating-button-container">
        <button className="floating-button">
          <span>+</span>
        </button>
      </div>
    </>
  );
};

export default SignUp;
