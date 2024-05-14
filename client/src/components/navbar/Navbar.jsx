import "./navbar.scss";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";
import { makeRequest } from "../../axios";

const Navbar = () => {
  const { toggle, darkMode } = useContext(DarkModeContext);
  const { currentUser } = useContext(AuthContext);
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const navigate = useNavigate();

  const searchHandler = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
  };

  const clearSearch = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  const logout = async () => {
    await makeRequest.post("/auth/logout");
    alert("Logged out");
    navigate("/login");
  };

  const handleAdmin = () => {
    navigate("/admin");
  };

  const handleManager = () => {
    navigate("/manager");
  };

  useEffect(() => {
    const fetchData = async () => {
      if (wordEntered !== "") {
        const { data } = await makeRequest.get("/users/search/" + wordEntered);
        setFilteredData(data);
      } else {
        setFilteredData([]);
      }
    };

    fetchData();
  }, [wordEntered]);

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>SocialNet</span>
        </Link>
        {darkMode ? (
          <WbSunnyOutlinedIcon onClick={toggle} />
        ) : (
          <DarkModeOutlinedIcon onClick={toggle} />
        )}
        {currentUser.roleId === 1 && (
          <AdminPanelSettingsIcon
            onClick={handleAdmin}
            style={{ cursor: "pointer" }}
          />
        )}
        {currentUser.roleId === 2 && (
          <ManageAccountsIcon
            onClick={handleManager}
            style={{ cursor: "pointer" }}
          />
        )}
        <div className="search">
          <input
            type="text"
            value={wordEntered}
            placeholder="Search..."
            onChange={searchHandler}
          />

          {filteredData.length > 0 && (
            <div className="absolute">
              <hr />
              {filteredData.map((value) => (
                <Link
                  to={`/profile/${value.id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                  onClick={clearSearch}
                  key={value.id}
                >
                  <div className="dataItem">{value.name}</div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="right">
        <div className="user">
          <img src={"/upload/" + currentUser.profilePic} alt="" />

          <Link
            to={`/profile/${currentUser.id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <span>{currentUser.name}</span>
          </Link>
        </div>
        {/* <NotificationsOutlinedIcon /> */}
        <LogoutIcon onClick={logout} style={{ cursor: "pointer" }} />
      </div>
    </div>
  );
};

export default Navbar;
