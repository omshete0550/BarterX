import React, { useEffect, useState } from "react";
import Navbar from "../../../Components/Navbar/Navbar";
import Footer from "../../../Components/Footer/Footer";
import "./Profile.css";
import { Link } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const user = localStorage.getItem('token');
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await axios.get(`http://localhost:8800/api/users/${user}`);
      setUserData(userData.data);
    }
    fetchUser();
  }, []);

  return (
    <>
      <Navbar />

      <section className="ProfilePageContainer">
        <main className="has-dflex-center">
          <section>
            <div className="lx-container-70">
              <div className="lx-row">
                <h1 className="Edittitle">Edit your profile</h1>
              </div>
              <div className="lx-row align-stretch">
                <div className="lx-column column-user-pic">
                  <div className="profile-pic bs-md">
                    <h1 className="pic-label">Profile picture</h1>
                    <div className="pic bs-md">
                      <img
                        src="https://images.unsplash.com/photo-1610216705422-caa3fcb6d158?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDB8fGZhY2V8ZW58MHwyfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                        alt=""
                        width="4024"
                        height="6048"
                        loading="lazy"
                      />
                      <a id="change-avatar" className="lx-btn">
                        <i className="fas fa-camera-retro"></i>&nbsp;&nbsp;Change
                        your profile picture.
                      </a>
                    </div>
                    <div className="pic-info">
                      <p>
                        <i className="fas fa-exclamation-triangle"></i>
                        &nbsp;&nbsp;This photo will appear on the platform, in
                        your contributions or where it is mentioned.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="lx-column">
                  <form action="get">
                    <div className="fieldset">
                      <label for="user-name">Name</label>
                      <div className="input-wrapper">
                        <span className="icon">
                          <i className="fas fa-user"></i>
                        </span>
                        <input
                          type="text"
                          id="user-name"
                          value={userData ? userData.name : "..."}
                          autocomplete="username"
                          required
                        />
                      </div>
                      <div id="user-name-helper" className="helper">
                      </div>
                    </div>
                    <div className="fieldset">
                      <label for="user-id">Phone</label>
                      <div className="input-wrapper">
                        <span className="icon">
                          <i className="fas fa-address-card"></i>
                        </span>
                        <input
                          type="number"
                          id="user-id"
                          value="8895388963"
                          required
                        />
                      </div>
                      <div id="user-id-helper" className="helper"></div>
                    </div>
                    <div className="fieldset">
                      <label for="email">E-mail</label>
                      <div className="input-wrapper">
                        <span className="icon">
                          <i className="fas fa-envelope"></i>
                        </span>
                        <input
                          type="email"
                          id="email"
                          value={userData ? userData.email : "..."}
                          autocomplete="username"
                        />
                      </div>
                      <div id="email-helper" className="helper"></div>
                    </div>
                    <div className="fieldset">
                      <label for="pass">Password</label>
                      <div className="input-wrapper">
                        <span className="icon">
                          <i className="fas fa-key"></i>
                        </span>
                        <input
                          type="password"
                          id="pass"
                          value="pass123*"
                          autocomplete="current-password"
                        />
                      </div>
                      <div id="pass-helper" className="helper"></div>
                    </div>
                    <div className="actions">
                      <a id="cancel" className="lx-btn">
                        <i className="fas fa-ban"></i>&nbsp;&nbsp;<Link to="/user-profile">Cancel</Link>
                      </a>
                      <a id="save" className="lx-btn">
                        <i className="fas fa-save"></i>&nbsp;&nbsp;Save
                      </a>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </main>

        <script
          src="https://use.fontawesome.com/releases/v5.14.0/js/all.js"
          defer
          crossorigin="anonymous"
          data-search-pseudo-elements
        ></script>
      </section>

      <Footer />
    </>
  );
};

export default Profile;
