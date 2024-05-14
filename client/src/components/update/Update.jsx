import { useState } from "react";
import { makeRequest } from "../../axios";
import "./update.scss";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloseIcon from "@mui/icons-material/Close";

const Update = ({ setOpenUpdate, user }) => {
  const [cover, setCover] = useState(null);
  const [profile, setProfile] = useState(null);
  const { email, password, name, city, website } = user;

  const setTextsValue = (name, value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const [values, setValues] = useState({
    email,
    password,
    name,
    city,
    website,
  });

  const uploadFile = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTextsValue(name, value);
  };

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (user) => {
      return makeRequest.put("/users", user);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["user"]);
      },
    }
  );

  const handleClick = async (e) => {
    e.preventDefault();

    let coverUrl = cover ? await uploadFile(cover) : user.coverPic;
    let profileUrl = profile ? await uploadFile(profile) : user.profilePic;

    mutation.mutate({ ...values, coverPic: coverUrl, profilePic: profileUrl });
    setOpenUpdate(false);
    setCover(null);
    setProfile(null);
  };

  const handleFileChange = async (e, setter) => {
    const file = e.target.files[0];
    setter(file);
  };

  const handleCoverChange = (e) => {
    handleFileChange(e, setCover);
  };

  const handleProfileChange = (e) => {
    handleFileChange(e, setProfile);
  };

  return (
    <div className="update">
      <div className="wrapper">
        <h1>Update Your Profile</h1>
        <form>
          <div className="files">
            <label htmlFor="cover">
              <span>Cover Picture</span>
              <div className="imgContainer">
                <img
                  src={cover ? URL.createObjectURL(cover) : "/upload/" + user.coverPic}
                  alt=""
                />
                <CloudUploadIcon className="icon" />
              </div>
            </label>
            <input
              type="file"
              id="cover"
              style={{ display: "none" }}
              onChange={handleCoverChange}
            />
            <label htmlFor="profile">
              <span>Profile Picture</span>
              <div className="imgContainer">
                <img
                  src={profile ? URL.createObjectURL(profile) : "/upload/" + user.profilePic}
                  alt=""
                />
                <CloudUploadIcon className="icon" />
              </div>
            </label>
            <input
              type="file"
              id="profile"
              style={{ display: "none" }}
              onChange={handleProfileChange}
            />
          </div>
          <label>Email</label>
          <input
            type="text"
            value={values.email}
            name="email"
            onChange={handleChange}
          />
          <label>Password</label>
          <input
            type="text"
            value={values.password}
            name="password"
            onChange={handleChange}
          />
          <label>Name</label>
          <input type="text" value={values.name} name="name" onChange={handleChange} />
          <label>Country / City</label>
          <input type="text" name="city" value={values.city} onChange={handleChange} />
          <label>Website</label>
          <input
            type="text"
            name="website"
            value={values.website}
            onChange={handleChange}
          />
          <button onClick={handleClick}>Update</button>
        </form>
        <button className="close" onClick={() => setOpenUpdate(false)}>
          <CloseIcon />
        </button>
      </div>
    </div>
  );
};

export default Update;
