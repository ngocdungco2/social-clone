import "./comments.scss";
import moment from "moment";
import { makeRequest } from "../../axios";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const Comments = ({ postId }) => {
  const [desc, setDesc] = useState("");
  const { currentUser } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const { isLoading, error, data } = useQuery(["comments", postId], () =>
    makeRequest.get("/comments?postId=" + postId).then((res) => {
      return res.data;
    })
  );

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (newComment) => {
      makeRequest.post("/comments", newComment);
      makeRequest.post("/activities");
      makeRequest.post("/comments/log", newComment);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["comments"]);
        queryClient.invalidateQueries(["activities"]);
      },
    }
  );

  // const activityMutation = useMutation(
  //   (userId) => {
  //     return makeRequest.post("/activities", userId);
  //   },
  //   {
  //     onSuccess: () => {
  //       // Invalidate and refetch
  //       queryClient.invalidateQueries(["activities"]);
  //     },
  //   }
  // );

  const deleteMutation = useMutation(
    (commentId) => {
      // makeRequest.delete("/comments/RMlog" + commentId)
      makeRequest.delete("/comments/" + commentId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["comments"]);
      },
    }
  );

  console.log();

  const handleDelete = (commentId) => {
    deleteMutation.mutate(commentId);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    mutation.mutate({ desc, postId });

    setDesc("");
  };

  // const handleActivity = (userId) => {
  //   activityMutation.mutate({ userId });
  // };

  return (
    <div className="comments">
      <div className="write">
        <img src={"/upload/" + currentUser.profilePic} alt="" />
        <input
          type="text"
          placeholder="write a comment"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button onClick={handleClick}>Send</button>
      </div>
      {error
        ? "Something went wrong"
        : isLoading
        ? "loading"
        : data.map((comment) => (
            <div className="comment" key={comment.id}>
              <img src={"/upload/" + comment.profilePic} alt="" />
              <div className="info">
                <span>{comment.name}</span>
                <p>{comment.desc}</p>
              </div>
              <span className="date">
                {moment(comment.createdAt).fromNow()}
              </span>
              <MoreHorizIcon
                onClick={() => setMenuOpen(!menuOpen)}
                style={{ cursor: "pointer" }}
              />
              {menuOpen && comment.userId === currentUser.id && (
                <button onClick={() => handleDelete(comment.id)}>delete</button>
              )}
            </div>
          ))}
    </div>
  );
};

export default Comments;
