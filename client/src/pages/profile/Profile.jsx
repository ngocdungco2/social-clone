import "./profile.scss";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../../components/posts/Posts";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import Update from "../../components/update/Update";

const Profile = () => {
  const { currentUser } = useContext(AuthContext);
  const [openUpdate, setOpenUpdate] = useState(false);

  const userId = parseInt(useLocation().pathname.split("/")[2]);

  const { isLoading: isLoadingUser, data: userData } = useQuery(
    ["user", userId],
    () => makeRequest.get("/users/find/" + userId).then((res) => res.data)
  );

  const { isLoading: isLoadingRelationship, data: relationshipData } = useQuery(
    ["relationship", userId],
    () =>
      makeRequest.get("/relationships?followedUserId=" + userId).then((res) => res.data)
  );

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (following) => {
      if (following)
        return makeRequest.delete("/relationships?userId=" + userId);
      return makeRequest.post("/relationships", { userId });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["relationship", userId]);
      },
    }
  );

  const handleFollow = () => {
    mutation.mutate(relationshipData.includes(currentUser.id));
  };

  useEffect(() => {
    if (!isLoadingUser && !isLoadingRelationship) {
      setOpenUpdate(false);
    }
  }, [isLoadingUser, isLoadingRelationship]);

  return (
    <div className="profile">
      {isLoadingUser ? (
        "loading"
      ) : (
        <>
          <div className="images">
            <img src={"/upload/" + userData.coverPic} alt="" className="cover" />
            <img src={"/upload/" + userData.profilePic} alt="" className="profilePic" />
          </div>

          <div className="profileContainer">
            <div className="uInfo">
              <div className="left">
                {isLoadingRelationship ? (
                  "loading"
                ) : userId === currentUser.id ? (
                  <></>
                ) : (
                  <button onClick={handleFollow}>
                    {relationshipData.includes(currentUser.id)
                      ? "Following"
                      : "Follow"}
                  </button>
                )}
              </div>
              <div className="center">
                <div>
                  <span>{userData.name}</span>
                </div>
              </div>
              <div className="right">
                <EmailOutlinedIcon />
                {userId === currentUser.id && (
                  <MoreVertIcon onClick={() => setOpenUpdate(true)} />
                )}
              </div>
            </div>
            <Posts userId={userId} />
          </div>
        </>
      )}
      {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={userData} />}
    </div>
  );
};

export default Profile;
