import "./post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";
import { useState } from "react";
import moment from "moment";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

const Post = ({ post }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const { isLoading, error, data } = useQuery(["likes", post.id], () =>
    makeRequest.get("/likes?postId=" + post.id).then((res) => {
      return res.data;
    })
  );

  const queryClient = useQueryClient();
  //likes
  const mutation = useMutation(
    (liked) => {
      if (liked){
        makeRequest.delete("/likes/removeLog?postId=" + post.id)
        return makeRequest.delete("/likes?postId=" + post.id)
      }else{
        makeRequest.post("/likes/log", {postId: post.id})
        return makeRequest.post("/likes", { postId: post.id });}
      
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["likes"]);
        window.location.reload()
      },
    },
  );

  const deleteMutation = useMutation(
    (postId) => {
      makeRequest.delete("/posts/removeLog." + postId)
      return makeRequest.delete("/posts/" + postId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );

  const verifiedMutation = useMutation(
    (postId) => {
      makeRequest.post("/posts/verify", { postId: postId });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );

  const handleLike = () => {
    mutation.mutate(data.includes(currentUser.id));
  };

  const handleDelete = () => {
    deleteMutation.mutate(post.id);

  };

  const handleVerify = () => {
    verifiedMutation.mutate(post.id);
  };

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={"/upload/" + post.profilePic} alt="" />

            <div className="details">
              <Link
                to={`/profile/${post.userId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{post.name}</span>
              </Link>
              <span className="date">{moment(post.createdAt).fromNow()}</span>
            </div>
          </div>
          <MoreHorizIcon
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ cursor: "pointer" }}
          />
          {menuOpen && (
            <>
              {currentUser.roleId === 0 ? (
                <>
                  <button onClick={handleDelete}>Delete</button>
                </>
              ) : (
                <>
                  <button onClick={handleVerify}>Verify</button>
                </>
              )}
            </>
          )}
        </div>
        <div className="content">
          <p>{post.desc}</p>
          <img src={"/upload/" + post.img} alt="" />
        </div>
        <div className="info">
          <div className="item">
            {isLoading ? (
              "loading"
            ) : data.includes(currentUser.id) ? (
              <FavoriteOutlinedIcon
                style={{ color: "red" }}
                onClick={handleLike}
              />
            ) : (
              <FavoriteBorderOutlinedIcon onClick={handleLike} />
            )}
            {data?.length} Likes
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon />
            See Comments
          </div>
          {/* <div className="item">
            <ShareOutlinedIcon />
            Share
          </div> */}
        </div>
        {commentOpen && <Comments postId={post.id} />}
      </div>
    </div>
  );
};

export default Post;
