import React from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { FiList } from "react-icons/fi";
import { SlCalender } from "react-icons/sl";
import "./css-files/home.css";

const SignUp: React.FC = () => {
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
                <button>
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
                <button>
                  <div>
                    <span className="text-align1">
                      <SlCalender />
                    </span>{" "}
                    <span className="text-align2">Calender</span>
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
          {/* <div className="right-image">
          <img src="Image/right-bg.png" alt="" />
        </div> */}

          <div className="right-container">
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

              <div className="activity-item">
                <h3 className="activity-title">Prepare for Interview</h3>
                <p className="activity-date">6th Apr 2024</p>
                <p className="activity-description">
                  Tomorrow I have an important interview scheduled for a job I{" "}
                </p>
                <p>
                  <span className="activity-tag">#Interview</span>{" "}
                  <span className="activity-tag">#Preparation</span>
                </p>
              </div>

              <div className="activity-item">
                <h3 className="activity-title">Organize Home Office</h3>
                <p className="activity-date">6th Apr 2024</p>
                <p className="activity-description">
                  My home office has become a cluttered mess, making it
                  difficult{" "}
                </p>
                <p>
                  <span className="activity-tag">#Organization</span>{" "}
                  <span className="activity-tag">#Productivity</span>
                </p>
              </div>

              <div className="activity-item">
                <h3 className="activity-title">Plan Weekend Gateway</h3>
                <p className="activity-date">6th Apr 2024</p>
                <p className="activity-description">
                  With the hectic work schedule lately, I've been feeling burn{" "}
                </p>
                <p>
                  <span className="activity-tag">#Travel</span>{" "}
                  <span className="activity-tag">#Relaxation</span>{" "}
                  <span className="activity-tag">#Gateway</span>
                </p>
              </div>
            </div>
          </div>
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
