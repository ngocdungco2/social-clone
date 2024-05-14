import "./rightBar.scss";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";
import { makeRequest } from "../../axios";
import { useState } from "react";
import moment from "moment";

const RightBar = () => {
  const { currentUser } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [post, setPosts] = useState([])
  const [post1, setPosts1] = useState([])
  const user = localStorage.getItem("user");
  const userdata = JSON.parse(user);
  //follow suggest
  useEffect(() => {
    // Gửi yêu cầu lấy dữ liệu từ cơ sở dữ liệu
    makeRequest
      .get("/users/load/"+ userdata.id) // Thay đổi URL và phương thức yêu cầu phù hợp với cơ sở dữ liệu của bạn
      .then((response) => {
        // Xử lý dữ liệu nhận về và cập nhật trạng thái
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []); // Đảm bảo useEffect chỉ chạy một lần khi component được tạo

  const navigate = useNavigate();
console.log(users)

  //latest activity
  useEffect(() =>{
    makeRequest
    .get("/users/trending/" + userdata.id) // Thay đổi URL và phương thức yêu cầu phù hợp với cơ sở dữ liệu của bạn
    .then((response) => {
      // Xử lý dữ liệu nhận về và cập nhật trạng thái
      setPosts(response.data);
    })
    .catch((error) => {
      console.error("Error fetching user data:", error);
    });
  }, [])
  //latest post
  useEffect(() =>{
    makeRequest
    .get("/users/latestPost/" + userdata.id) // Thay đổi URL và phương thức yêu cầu phù hợp với cơ sở dữ liệu của bạn
    .then((response) => {
      // Xử lý dữ liệu nhận về và cập nhật trạng thái
      setPosts1(response.data);
    })
    .catch((error) => {
      console.error("Error fetching user data:", error);
    });
  }, [])
  return (
    <div className="rightBar">
      <div className="container">
        <div className="item">
          <span>Person You May Know</span>
          {users.map((user) => (
            <div key={user.id} className="user">
              <div className="userInfo">
                <img src={"/upload/" + user.profilePic} alt={user.profilePic} />
                <span>{user.name}</span>
              </div>
              <div
                className="buttons"
                onClick={() => navigate("/profile/" + user.id)}
              >
                <button>Visit user</button>
              </div>
            </div>
          ))}
        </div>
        <div className="item">
          <span>Latest Activity</span>
          
          {post.map((post, index) => (
            <div key={index} className="user">
              <div className="userInfo">
                <img src={"upload/" + post.profilePic} alt="img" />
                <p>
                <span>{post.userName}</span> {post.status} To <span>{post.postOwnerName}</span> Post
              </p>
              </div>
              <span>{moment(post.timelog).fromNow()}</span>
            </div>
          ))}
            
          </div>
          <div className="item">
          <span>Latest Uploaded</span>
          
          {post1.map((post, index) => (
            <div key={index} className="user">
              <div className="userInfo">
                <img src={"upload/" + post.profilePic} alt="img" />
                <p>
                <span>{post.userName}</span> {post.status}
              </p>
              </div>
              <span>{moment(post.timeLog).fromNow()} {console.log(post.timeLog)}</span>
            </div>
          ))}
            
          </div>
      </div>
    </div>
  );
};

export default RightBar;
